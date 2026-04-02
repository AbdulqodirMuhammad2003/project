import { useState } from 'react';
import { 
  Search, Plus, Mail, Phone, CalendarCheck, User, ArrowUpRight, GraduationCap, ChevronDown, MessageCircle,
  SquarePen, Funnel, Pen, ExternalLink, Pencil, Trash2, Users, Ban
} from 'lucide-react';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const CLASSES = [
  { id: '5-A', label: '5-A', colorHex: '248, 113, 113', time: 'Ju · 10:35' },
  { id: '5-B', label: '5-B', colorHex: '251, 146, 60', time: 'Ju · 9:40' },
  { id: '5-D', label: '5-D', colorHex: '251, 191, 36', time: 'Ju · 8:00' },
  { id: '6-A', label: '6-A', colorHex: '74, 222, 128', time: '16:20 – 17:05' },
  { id: '6-B', label: '6-B', colorHex: '45, 212, 191', time: '14:40 – 15:25' },
  { id: '6-D', label: '6-D', colorHex: '96, 165, 250', time: '' },
  { id: '7-A', label: '7-A', colorHex: '129, 140, 248', time: '' },
  { id: '7-B', label: '7-B', colorHex: '192, 132, 252', time: '' },
  { id: '7-D', label: '7-D', colorHex: '244, 114, 182', time: '' },
  { id: '8-A', label: '8-A', colorHex: '248, 113, 113', time: '' },
  { id: '8-B', label: '8-B', colorHex: '251, 146, 60', time: '' },
  { id: '9-A', label: '9-A', colorHex: '251, 191, 36', time: '' },
  { id: '9-B', label: '9-B', colorHex: '74, 222, 128', time: '' },
  { id: 'none', label: "Sinf yo'q", colorHex: '148, 163, 184', time: '' },
];

const STUDENTS = [
  { id: '1001', name: 'Alibek Safarov', initials: 'AS', score: '100%', status: 'Active' },
  { id: '1002', name: "Dinora Jo'rayeva", initials: 'DJ', score: '100%', status: 'Active' },
  { id: '1003', name: 'Diyora Eshmirzayeva', initials: 'DE', score: '100%', status: 'Active' },
  { id: '1004', name: 'Doston Anorboyev', initials: 'DA', score: '94%', status: 'Active' },
  { id: '1005', name: 'Elyor Jovliyev', initials: 'EJ', score: '94%', status: 'Active' },
  { id: '1006', name: 'Farida Safarova', initials: 'FS', score: '82%', status: 'Active' },
  { id: '1007', name: 'Halima Jumanazarova', initials: 'HJ', score: '88%', status: 'Active' },
  { id: '1008', name: 'Jamshid Eshmirzayev', initials: 'JE', score: '88%', status: 'Active' },
  { id: '1009', name: 'Madina Jovliyeva', initials: 'MJ', score: '100%', status: 'Active' },
  { id: '1010', name: 'Madina Soatmurodova', initials: 'MS', score: '100%', status: 'Active' },
  { id: '1011', name: 'Mohira Soatmurodova', initials: 'MS', score: '100%', status: 'Active' },
  { id: '1012', name: "Ozodbek Jamg'irov", initials: 'OJ', score: '94%', status: 'Active' },
  { id: '1013', name: "Zebo Po'latova", initials: 'ZP', score: '100%', status: 'Active' },
].map(s => ({ ...s, classId: '5-A', phone: "Ko'rsatilmagan", email: "Ko'rsatilmagan" }));

export default function Students() {
  const [selectedClassId, setSelectedClassId] = useState('5-A');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const filteredStudents = selectedClassId === 'none' ? [] : STUDENTS.filter(s => s.classId === selectedClassId || selectedClassId === '5-A');
  const activeStudent = STUDENTS.find(s => s.id === selectedStudentId);
  const activeClassObj = CLASSES.find(c => c.id === selectedClassId) || { id: 'none', label: "Sinf yo'q", colorHex: '148, 163, 184', time: '' };
  
  const cHex = activeClassObj.colorHex;

  let gridCols;
  if (selectedClassId === 'none') {
    gridCols = 'calc(25% + 0.25rem) 0px calc(75% - 0.25rem)';
  } else if (!selectedStudentId) {
    gridCols = 'calc(25% + 0.25rem) calc(75% - 0.25rem) 0px';
  } else {
    gridCols = 'calc(25% + 0.25rem) calc(50% + 0.5rem) calc(25% - 0.75rem)';
  }

  return (
    <div className="flex-1 min-h-0 pb-4 h-[calc(100vh-64px)] overflow-hidden" style={{ paddingTop: "0.5rem" }}>
      <div className="h-full transition-opacity duration-200">
        <div className="flex flex-col h-full">
          <main className="flex-1 min-h-0 flex flex-col p-4 lg:p-8 lg:pb-0">
            <div 
              className="flex-1 min-h-0 grid p-3 -m-3" 
              style={{
                gridTemplateColumns: gridCols,
                gridTemplateRows: '1fr',
                transition: 'grid-template-columns 350ms cubic-bezier(0.4, 0, 0.2, 1)',
                gap: '0px'
              }}
            >
              {/* ─── Column 1: Classes ─── */}
              <div className="min-w-0 min-h-0 pr-4">
                <div className="h-full grid" data-tour="student-class-selector">
                  <div className="bg-card rounded-xl card-elevation flex flex-col overflow-hidden min-w-0 min-h-0 h-full">
                    <div className="px-5 pt-5 pb-3 flex items-center justify-between shrink-0 gap-3 min-h-[4.5rem]">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-muted">
                          <GraduationCap className="size-5 text-foreground" />
                        </div>
                        <h2 className="heading-section">Barcha sinflar</h2>
                      </div>
                      <button className="size-11 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <Plus className="size-5" />
                      </button>
                    </div>

                    <div className="flex-1 min-h-0 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none"></div>
                      <div className="relative overflow-hidden h-full">
                        <div className="h-full w-full overflow-y-auto custom-scrollbar">
                          <div className="px-5 pt-1 pb-5 space-y-1">
                            {CLASSES.map(cls => {
                              if (cls.id === 'none') return null;
                              const isActive = selectedClassId === cls.id;
                              
                              if (isActive) {
                                return (
                                  <button 
                                    key={cls.id}
                                    onClick={() => { setSelectedClassId(cls.id); setSelectedStudentId(null); }}
                                    className="w-full flex items-center text-left gap-3 p-4 border-2 rounded-xl cursor-pointer animate-spring-bounce ring-2 ring-inset ring-primary/40" 
                                    style={{ borderColor: `rgb(${cHex})`, backgroundColor: `rgba(${cHex}, 0.063)` }}
                                  >
                                    <div className="p-3.5 rounded-xl shrink-0" style={{ backgroundColor: `rgba(${cHex}, 0.125)` }}>
                                      <GraduationCap className="size-7" style={{ color: `rgb(${cHex})` }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="heading-small leading-tight truncate block">{cls.label}</span>
                                      <span className="text-xs text-muted-foreground/60 mt-0.5 block truncate">{cls.time}</span>
                                    </div>
                                  </button>
                                );
                              }

                              return (
                                <button
                                  key={cls.id}
                                  onClick={() => { setSelectedClassId(cls.id); setSelectedStudentId(null); }}
                                  className="group w-full flex items-center text-left gap-2.5 px-3 py-2 border-2 border-transparent rounded-lg cursor-pointer transition-transform duration-200 ease-out hover:translate-x-1.5 hover:bg-muted/50"
                                >
                                  <div className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: `rgb(${cls.colorHex})` }}></div>
                                  <span className="text-sm text-foreground/70 truncate flex-1 transition-all duration-200 ease-out group-hover:text-foreground group-hover:font-semibold">
                                    {cls.label}
                                  </span>
                                </button>
                              );
                            })}
                            
                            <button 
                              onClick={() => { setSelectedClassId('none'); setSelectedStudentId(null); }}
                              className={`w-full flex items-center text-left gap-3 p-4 border-2 rounded-xl cursor-pointer mt-2 ${selectedClassId === 'none' ? 'ring-2 ring-inset ring-primary/40 border-muted-foreground/30 bg-muted/20' : 'border-transparent hover:bg-muted/50 transition-colors'}`}
                            >
                              <div className="p-3.5 rounded-xl shrink-0 bg-muted/50">
                                <Ban className="size-7 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="heading-small leading-tight truncate block">Sinf yo'q</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedClassId !== 'none' && (
                      <div className="group/stats border-t border-border px-5 py-5 space-y-4 shrink-0">
                        <div className="flex items-center gap-3">
                          <a className="relative group/icon p-3.5 rounded-xl shrink-0 block overflow-hidden" 
                             title="Open class" href="#" style={{ backgroundColor: `rgba(${cHex}, 0.125)` }}>
                            <span className="absolute inset-0 rounded-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200" style={{ backgroundColor: `rgb(${cHex})` }}></span>
                            <GraduationCap className="relative size-7 transition-opacity duration-200 group-hover/icon:opacity-0" style={{ color: `rgb(${cHex})` }} />
                            <ArrowUpRight className="size-7 absolute inset-0 m-auto opacity-0 transition-opacity duration-200 group-hover/icon:opacity-100 text-white" />
                          </a>
                          <div className="min-w-0 flex-1">
                            <h4 className="heading-small leading-tight truncate">{activeClassObj.label}</h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1 leading-relaxed">{activeClassObj.time}</p>
                          </div>
                          <div className="shrink-0 flex items-center gap-0.5 opacity-0 group-hover/stats:opacity-100 transition-opacity duration-200">
                            <button className="p-2 rounded-lg text-muted-foreground/40 hover:text-primary hover:bg-muted transition-colors" title="Sinfni tahrirlash">
                              <Pencil className="size-4" />
                            </button>
                            <button className="p-2 rounded-lg text-muted-foreground/40 hover:text-destructive hover:bg-muted transition-colors" title="Sinfni o'chirish">
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>
                        <div className="gap-2 text-center grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))' }}>
                          <div className="p-2 rounded-lg" style={{ backgroundColor: `rgba(${cHex}, 0.082)` }}>
                            <p className="text-lg font-bold">{filteredStudents.length}</p>
                            <p className="text-[10px] text-muted-foreground">Jami</p>
                          </div>
                          <div className="p-2 rounded-lg" style={{ backgroundColor: `rgba(${cHex}, 0.082)` }}>
                            <p className="text-lg font-bold">{filteredStudents.filter(s => s.status === 'Active').length}</p>
                            <p className="text-[10px] text-muted-foreground">Faol</p>
                          </div>
                          <div className="p-2 rounded-lg" style={{ backgroundColor: `rgba(${cHex}, 0.082)` }}>
                            <p className="text-lg font-bold">{filteredStudents.filter(s => s.status !== 'Active').length}</p>
                            <p className="text-[10px] text-muted-foreground">Yo'q</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Faol</span>
                            <span className="font-medium">{filteredStudents.length > 0 ? Math.round((filteredStudents.filter(s => s.status === 'Active').length / filteredStudents.length)*100) : 0}%</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: filteredStudents.length > 0 ? `${(filteredStudents.filter(s => s.status === 'Active').length / filteredStudents.length)*100}%` : '0%', backgroundColor: `rgb(${cHex})` }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ─── Column 2: Students ─── */}
              <div className={`min-w-0 min-h-0 grid pr-4 ${selectedClassId === 'none' ? 'hidden' : ''}`} data-tour="student-list">
                <div className="@container bg-card rounded-xl card-elevation flex flex-col min-w-0 min-h-0 h-full">
                  <div className="flex items-center px-5 pt-5 pb-3 gap-2.5 shrink-0 min-h-[4.5rem]">
                    <div className="p-2 rounded-lg bg-muted">
                      <Users className="size-5 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="heading-section truncate flex items-center gap-2">
                        O'quvchilar
                        <span className="text-muted-foreground font-normal text-sm">({filteredStudents.length})</span>
                      </h2>
                    </div>
                    
                    <div className="ml-auto flex items-center gap-3">
                      <button className="inline-flex items-center justify-center gap-2 border border-border shadow-xs hover:bg-accent hover:text-accent-foreground size-9 h-11 w-11 rounded-xl bg-card card-elevation">
                        <SquarePen className="h-4 w-4" />
                      </button>
                      <button className="inline-flex items-center justify-center gap-2 border border-border shadow-xs hover:bg-accent hover:text-accent-foreground size-9 h-11 w-11 rounded-xl bg-card card-elevation">
                        <Search className="h-4 w-4" />
                      </button>
                      <button className="inline-flex items-center justify-center gap-2 border border-border shadow-xs hover:bg-accent hover:text-accent-foreground size-9 h-11 w-11 rounded-xl bg-card card-elevation">
                        <Funnel className="h-4 w-4" />
                      </button>
                      <button className="inline-flex items-center justify-center gap-2 border border-border shadow-xs hover:bg-accent hover:text-accent-foreground py-2 px-0 @[700px]:px-5 h-11 w-11 @[700px]:w-auto rounded-xl font-semibold bg-card card-elevation">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="hidden @[700px]:inline">Saralash: Ism</span>
                      </button>

                      <div className="hidden @[700px]:flex">
                        <button className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-5 rounded-l-xl rounded-r-none font-semibold shadow-md shadow-primary/10">
                          <Plus className="h-4 w-4 mr-1" />
                          Yangi o'quvchi
                        </button>
                        <div className="w-px bg-white/30"></div>
                        <button className="inline-flex items-center justify-center h-11 px-2.5 rounded-l-none rounded-r-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/10 cursor-pointer">
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-h-0 relative overflow-hidden rounded-b-xl">
                    <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none"></div>
                    <div className="relative overflow-hidden h-full">
                      <div className="h-full w-full overflow-y-auto custom-scrollbar">
                        <div className="px-5 pt-1 pb-5 space-y-3">
                          {filteredStudents.map((student) => {
                            const isSelected = selectedStudentId === student.id;
                            
                            return (
                              <div
                                key={student.id}
                                onClick={() => setSelectedStudentId(student.id)}
                                className={`group bg-background rounded-xl border p-4 cursor-pointer transition-all duration-200 ease-out hover:scale-[1.02] ${
                                  isSelected 
                                    ? 'border-2 animate-spring-bounce ring-2 ring-primary/40' 
                                    : 'border-border hover:border-border/80 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)]'
                                }`}
                                style={isSelected ? { borderColor: `rgb(${cHex})`, backgroundColor: `rgba(${cHex}, 0.08)` } : {}}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="shrink-0">
                                    <div className="rounded-full flex items-center justify-center font-semibold text-white shrink-0 overflow-hidden text-base size-14" style={{ backgroundColor: `rgb(${cHex})` }}>
                                      {student.initials}
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="heading-small leading-tight truncate transition-colors group-hover:text-primary">{student.name}</h4>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                      <span className="text-xs text-muted-foreground/60">O'quvchi ID: {student.id}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="shrink-0 flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                                        <CalendarCheck className="size-3 flex-shrink-0" />
                                        {student.score}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="shrink-0">
                                    <button type="button" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all whitespace-nowrap cursor-pointer hover:opacity-80 active:scale-95 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                                      <span className="size-1.5 rounded-full flex-shrink-0 bg-emerald-500"></span>
                                      Active
                                    </button>
                                  </div>

                                  <div className="shrink-0 group/actions relative flex items-center before:content-[''] before:absolute before:-inset-y-4 before:-left-10 before:-right-4">
                                    <div className="relative z-10 flex items-center gap-0.5 overflow-hidden max-w-0 opacity-0 group-hover/actions:max-w-16 group-hover/actions:opacity-100 transition-all duration-200 ease-out">
                                      <button className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-primary hover:bg-muted transition-colors shrink-0">
                                        <Pencil className="size-3.5" />
                                      </button>
                                      <button className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-destructive hover:bg-muted transition-colors shrink-0">
                                        <Trash2 className="size-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Column 3: Preview ─── */}
              <div className={`min-w-0 min-h-0 grid ${selectedClassId === 'none' ? 'col-span-2' : ''}`} data-tour="student-preview">
                {selectedClassId === 'none' ? (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center border-2 border-transparent bg-background rounded-xl card-elevation">
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mb-4 relative">
                      <Users className="size-8 relative z-10" />
                    </div>
                    <h3 className="heading-small text-foreground mb-1">Sinf tanlanmagan</h3>
                    <p className="text-sm text-muted-foreground max-w-[200px]">O'quvchilarni ko'rish uchun sinf tanlang.</p>
                  </div>
                ) : activeStudent ? (
                  <div className="rounded-xl flex flex-col overflow-hidden min-w-0 min-h-0 h-full group/card bg-card card-elevation">
                    <div className="h-32 relative shrink-0 overflow-hidden" style={{ background: `linear-gradient(rgba(${cHex}, 0.27), rgba(${cHex}, 0.333))` }}>
                      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full" style={{ backgroundColor: `rgba(${cHex}, 0.19)` }}></div>
                      <div className="absolute right-4 top-10 w-12 h-12 rounded-full" style={{ backgroundColor: `rgba(${cHex}, 0.314)` }}></div>
                      <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 400 24" preserveAspectRatio="none" style={{ height: '24px' }}>
                        <path d="M0,24 L0,20 Q200,0 400,20 L400,24 Z" className="fill-card"></path>
                      </svg>
                      <button className="absolute top-3 left-3 h-8 w-8 inline-flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground/70 hover:text-foreground opacity-0 group-hover/card:opacity-100 transition-opacity shadow-sm z-10" aria-label="O'quvchini tahrirlash">
                        <Pen className="h-3.5 w-3.5" />
                      </button>
                      <a className="absolute top-3 right-3 h-8 w-8 inline-flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground/70 hover:text-foreground opacity-0 group-hover/card:opacity-100 transition-opacity shadow-sm z-10" aria-label="To'liq profilni ko'rish" href="#">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    
                    <div className="flex justify-center -mt-16 mb-4 shrink-0 px-6 relative z-20">
                      <div className="w-28 h-28 rounded-full border-4 border-card bg-card overflow-hidden shadow-md">
                        <div className="rounded-full flex items-center justify-center font-semibold text-white shrink-0 overflow-hidden size-12 !w-full !h-full !text-[32px]" style={{ backgroundColor: `rgb(${cHex})` }}>
                          {activeStudent.initials}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col relative px-6 pb-6 overflow-y-auto min-h-0 custom-scrollbar">
                      <div className="text-center space-y-2 mb-4">
                        <div className="flex items-center justify-center">
                          <button type="button" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all whitespace-nowrap bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                            <span className="size-1.5 rounded-full flex-shrink-0 bg-emerald-500"></span>
                            Active
                          </button>
                        </div>
                        <h2 className="heading-section">{activeStudent.name}</h2>
                        <p className="text-sm text-muted-foreground">ID: {activeStudent.id}</p>
                      </div>
                      
                      <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm duration-150 cursor-pointer active:scale-[0.98] text-white px-4 py-2 w-full h-11 rounded-xl font-semibold shadow-lg mb-6 transition-all hover:brightness-110 hover:scale-[1.02]" href="#" style={{ backgroundColor: `rgb(${cHex})`, boxShadow: `rgba(${cHex}, 0.2) 0px 10px 15px -3px` }}>
                        Profilni ko'rish
                      </a>
                      
                      <div className="mb-6">
                        <h3 className="text-label mb-4 text-[11px] font-extrabold text-foreground uppercase tracking-widest">Sinflar</h3>
                        <div className="flex flex-wrap gap-2">
                          <div className="px-3 py-1.5 rounded-md text-[13px] font-medium" style={{ backgroundColor: `rgba(${cHex}, 0.125)`, color: `rgb(${cHex})` }}>
                            {activeStudent.classId}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-label mb-4 text-[11px] font-extrabold text-foreground uppercase tracking-widest">Bog'lanish</h3>
                        <div className="flex items-start gap-3 mb-6">
                          <div className="mt-0.5 p-2 rounded-lg shrink-0" style={{ backgroundColor: `rgba(${cHex}, 0.125)` }}>
                            <Mail className="h-4 w-4" style={{ color: `rgb(${cHex})` }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Elektron pochta</p>
                            <p className="text-sm text-muted-foreground mt-0.5 truncate">{activeStudent.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 p-2 rounded-lg shrink-0" style={{ backgroundColor: `rgba(${cHex}, 0.125)` }}>
                            <Phone className="h-4 w-4" style={{ color: `rgb(${cHex})` }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Telefon raqami</p>
                            <p className="text-sm text-muted-foreground mt-0.5">{activeStudent.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto px-6 py-4 flex gap-4 shrink-0 shadow-[0_-8px_20px_-8px_rgba(0,0,0,0.05)] bg-card border-t border-border z-20">
                      <button className="inline-flex items-center justify-center gap-2 font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 text-sm h-11 w-full bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 rounded-xl" style={{ flex: '1 1 0%' }}>
                        <Mail className="h-4 w-4" />
                        Email
                      </button>
                      <button className="inline-flex items-center justify-center gap-2 font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 text-sm h-11 w-full text-white shadow-lg rounded-xl hover:brightness-110 active:scale-95" style={{ flex: '1 1 0%', backgroundColor: `rgb(${cHex})`, boxShadow: `rgba(${cHex}, 0.2) 0px 10px 15px -3px` }}>
                        <MessageCircle className="h-4 w-4" />
                        Chat
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center border-2 border-transparent bg-background rounded-xl card-elevation">
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mb-4 relative">
                      <User className="size-8 relative z-10" />
                      <div className="absolute -bottom-1 -right-1 size-5 bg-background rounded-full flex items-center justify-center">
                         <div className="size-3.5 bg-muted-foreground/30 rounded-full" />
                      </div>
                    </div>
                    <h3 className="heading-small text-foreground mb-1">O'quvchi tanlanmagan</h3>
                    <p className="text-sm text-muted-foreground max-w-[200px]">O'quvchining to'liq ma'lumotlarini ko'rish uchun tanlang.</p>
                  </div>
                )}
              </div>

            </div>
          </main>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
    </div>
  );
}
