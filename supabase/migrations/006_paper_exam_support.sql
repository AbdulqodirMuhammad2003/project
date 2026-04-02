-- ============================================
-- FAZA 5: Paper Exam Support
-- ============================================

-- 1. assessments jadvaliga answer_key va qo'shimcha maydonlar qo'shish
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'assessments' AND column_name = 'answer_key'
  ) THEN
    ALTER TABLE assessments ADD COLUMN answer_key JSONB;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'assessments' AND column_name = 'questions_count'
  ) THEN
    ALTER TABLE assessments ADD COLUMN questions_count INTEGER DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'assessments' AND column_name = 'variant_count'
  ) THEN
    ALTER TABLE assessments ADD COLUMN variant_count INTEGER DEFAULT 1;
  END IF;
END $$;
