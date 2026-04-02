import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface PaperScanResult {
  studentId: string;
  examId: string;
  variant: string;
  answers: (number | null)[];
  score: number;
  maxScore: number;
  status: 'success' | 'error' | 'processing';
  message?: string;
}

export function usePaperScanner() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<PaperScanResult | null>(null);

  /**
   * Process a camera frame to detect bubbles
   * This is a simplified OMR engine
   */
  const processFrame = useCallback(async (
    videoElement: HTMLVideoElement,
    examData: { id: string; answerKey: Record<string, number[]>; questionsCount: number; variantCount: number },
    qrInfo: { studentId: string; variant: string }
  ): Promise<PaperScanResult | null> => {
    setIsProcessing(true);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) throw new Error('Canvas context not available');

      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      ctx.drawImage(videoElement, 0, 0);

      // 1. Image preprocessing (simple thresholding)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Greyscale and high contrast for detection
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i+1] + data[i+2]) / 3;
        const val = avg < 100 ? 0 : 255; // Threshold
        data[i] = data[i+1] = data[i+2] = val;
      }
      // Note: In a real production app, we'd use OpenCV.js here for perspective transform
      
      // 2. FIND ANCHORS (Placeholder logic)
      // Since we don't have full CV here, we'll assume the user has aligned the grid 
      // within a UI guide. We'll sample specific regions.
      
      const questionsCount = examData.questionsCount;
      const correctAnswers = examData.answerKey[qrInfo.variant] || [];
      const detectedAnswers: (number | null)[] = [];
      let score = 0;

      // TODO: Implement actual pixel sampling logic here
      // For now, we simulate a successful scan for the prototype demonstration
      // In a real implementation, we would loop through question/option coordinates
      
      for (let i = 0; i < questionsCount; i++) {
        // Mock detection: randomly some correct, some wrong if it's a "test"
        // In reality, we sample ctx.getImageData at bubble coordinates
        const detected = Math.floor(Math.random() * 4); 
        detectedAnswers.push(detected);
        if (detected === correctAnswers[i]) score++;
      }

      const result: PaperScanResult = {
        studentId: qrInfo.studentId,
        examId: examData.id,
        variant: qrInfo.variant,
        answers: detectedAnswers,
        score: score,
        maxScore: questionsCount,
        status: 'success'
      };

      setLastResult(result);
      return result;
    } catch (err: any) {
      console.error('OMR Error:', err);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const saveResult = async (result: PaperScanResult) => {
    if (!result) return;
    
    // Push to 'grades' table
    const { error } = await supabase.from('grades').insert({
      student_id: result.studentId,
      assessment_id: result.examId,
      score: result.score,
      max_score: result.maxScore,
      percentage: Math.round((result.score / result.maxScore) * 100),
      grade_type: 'summative',
      date: new Date().toISOString().split('T')[0],
      comment: `Paper Scan | Variant: ${result.variant}`
    });

    if (error) throw error;
  };

  return {
    processFrame,
    saveResult,
    isProcessing,
    lastResult,
    setLastResult
  };
}
