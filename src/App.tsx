import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, RotateCcw, CheckCircle2, BarChart3, Sparkles, Brain, Target, ShieldAlert } from 'lucide-react';
import { questions } from './data/questions';
import { MBTIPole, QuizResult } from './types/mbti';
import { mbtiDescriptions } from './data/mbtiDescriptions';
import { GoogleGenAI } from "@google/genai";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 for landing page
  const [answers, setAnswers] = useState<Record<number, number>>({}); // -3 to 3
  const [showResult, setShowResult] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const progress = useMemo(() => {
    return Math.round(((Object.keys(answers).length) / questions.length) * 100);
  }, [answers]);

  const handleStart = () => {
    setCurrentIndex(0);
  };

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [questions[currentIndex].id]: score };
    setAnswers(newAnswers);

    // Auto-advance after a short delay for better UX
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateResult = (): QuizResult => {
    const scores: Record<MBTIPole, number> = {
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    };

    Object.entries(answers).forEach(([id, score]) => {
      const question = questions.find(q => q.id === parseInt(id));
      if (!question) return;

      const poleA = question.options.A.pole;
      const poleB = question.options.B.pole;
      const numericScore = score as number;

      if (numericScore > 0) {
        scores[poleA] += numericScore;
      } else if (numericScore < 0) {
        scores[poleB] += Math.abs(numericScore);
      }
    });

    const getPercentage = (pole1: number, pole2: number) => {
      const total = pole1 + pole2;
      return total === 0 ? 50 : Math.round((pole1 / total) * 100);
    };

    const resultType = [
      scores.E >= scores.I ? 'E' : 'I',
      scores.S >= scores.N ? 'S' : 'N',
      scores.T >= scores.F ? 'T' : 'F',
      scores.J >= scores.P ? 'J' : 'P'
    ].join('');

    return {
      type: resultType,
      scores,
      percentages: {
        EI: getPercentage(scores.E, scores.I),
        SN: getPercentage(scores.S, scores.N),
        TF: getPercentage(scores.T, scores.F),
        JP: getPercentage(scores.J, scores.P),
      }
    };
  };

  const handleAiAnalysis = async (type: string) => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a professional psychologist and career consultant.
        Please provide a deep personalized analysis for the MBTI personality type [${type}].
        The content should include:
        1. Specific application scenarios of core personality strengths.
        2. Challenges that may be encountered in interpersonal communication and suggestions for improvement.
        3. Suitable specific career directions and reasons.
        4. A word of encouragement for the user.
        Please use English, with a friendly and professional tone, and use Markdown format.`,
      });
      setAiAnalysis(response.text || 'Unable to generate analysis, please try again later.');
    } catch (error) {
      console.error('AI Analysis Error:', error);
      setAiAnalysis('An error occurred during the analysis. Please check your internet connection or try again later.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getGroupInfo = (type: string) => {
    const nt = ['INTJ', 'INTP', 'ENTJ', 'ENTP'];
    const nf = ['INFJ', 'INFP', 'ENFJ', 'ENFP'];
    const sj = ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'];
    const sp = ['ISTP', 'ISFP', 'ESTP', 'ESFP'];

    if (nt.includes(type)) return { name: 'Analysts', color: '#88619a', bg: 'bg-[#88619a]', text: 'text-[#88619a]' };
    if (nf.includes(type)) return { name: 'Diplomats', color: '#33a474', bg: 'bg-[#33a474]', text: 'text-[#33a474]' };
    if (sj.includes(type)) return { name: 'Sentinels', color: '#4298b4', bg: 'bg-[#4298b4]', text: 'text-[#4298b4]' };
    if (sp.includes(type)) return { name: 'Explorers', color: '#e4ae3a', bg: 'bg-[#e4ae3a]', text: 'text-[#e4ae3a]' };
    return { name: 'Unknown', color: '#1a1a1a', bg: 'bg-[#1a1a1a]', text: 'text-[#1a1a1a]' };
  };

  const resetQuiz = () => {
    setCurrentIndex(-1);
    setAnswers({});
    setShowResult(false);
    setAiAnalysis('');
  };

  if (showResult) {
    const result = calculateResult();
    const description = mbtiDescriptions[result.type];
    const group = getGroupInfo(result.type);

    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center p-4 md:p-8 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-5xl w-full bg-white rounded-[3rem] shadow-[0_20px_80px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          {/* Result Hero */}
          <div className={`${group.bg} p-12 md:p-20 text-center text-white relative overflow-hidden`}>
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-8"
              >
                Your personality type is:
              </motion.div>
              
              <motion.h1 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-6xl md:text-8xl font-black tracking-tighter mb-4"
              >
                {description.title}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-3xl md:text-4xl font-bold opacity-90 mb-8"
              >
                {result.type}
              </motion.div>

              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-white/30" />
                <span className="text-sm font-bold uppercase tracking-widest opacity-80">{group.name}</span>
                <div className="h-px w-12 bg-white/30" />
              </div>
            </div>
          </div>

          <div className="p-8 md:p-16">
            {/* Trait Bars Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-[#333]">Personality Strategy</h2>
                <p className="text-[#9e9e9e] text-sm font-medium mt-2">How you interact with your surroundings</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 max-w-4xl mx-auto">
                {[
                  { label: 'Mind', left: 'Introverted', right: 'Extraverted', value: 100 - result.percentages.EI, leftCode: 'I', rightCode: 'E' },
                  { label: 'Energy', left: 'Intuitive', right: 'Observant', value: 100 - result.percentages.SN, leftCode: 'N', rightCode: 'S' },
                  { label: 'Nature', left: 'Thinking', right: 'Feeling', value: result.percentages.TF, leftCode: 'T', rightCode: 'F' },
                  { label: 'Tactics', left: 'Judging', right: 'Prospecting', value: result.percentages.JP, leftCode: 'J', rightCode: 'P' },
                ].map((dim, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div className="text-left">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#9e9e9e] block mb-1">{dim.label}</span>
                        <span className={`text-sm font-bold ${dim.value >= 50 ? group.text : 'text-[#333]'}`}>{dim.left}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-bold ${dim.value < 50 ? group.text : 'text-[#333]'}`}>{dim.right}</span>
                      </div>
                    </div>
                    
                    <div className="h-4 w-full bg-[#f0f0f0] rounded-full overflow-hidden flex relative">
                      <div 
                        className={`h-full ${group.bg} transition-all duration-1000 ease-out rounded-full`} 
                        style={{ width: `${dim.value}%` }}
                      />
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/50" />
                    </div>
                    
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className={dim.value >= 50 ? group.text : 'text-[#9e9e9e]'}>{dim.value}%</span>
                      <span className={dim.value < 50 ? group.text : 'text-[#9e9e9e]'}>{100 - dim.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Left Column: Details */}
              <div className="lg:col-span-2 space-y-12">
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-2xl ${group.bg} text-white flex items-center justify-center shadow-lg shadow-black/5`}>
                      <Brain size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#333]">Core Identity</h3>
                  </div>
                  <p className="text-[#555] leading-relaxed text-lg font-medium opacity-90 bg-[#f8f9fa] p-8 rounded-[2rem] border border-[#f0f0f0]">
                    {description.description}
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100/50">
                    <h3 className="text-lg font-bold text-[#333] flex items-center gap-3 mb-6">
                      <Sparkles size={20} className="text-emerald-500" /> Strengths
                    </h3>
                    <ul className="space-y-4">
                      {description.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-[#555] flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-semibold">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  
                  <section className="bg-amber-50/50 p-8 rounded-[2rem] border border-amber-100/50">
                    <h3 className="text-lg font-bold text-[#333] flex items-center gap-3 mb-6">
                      <ShieldAlert size={20} className="text-amber-500" /> Challenges
                    </h3>
                    <ul className="space-y-4">
                      {description.weaknesses.map((w, i) => (
                        <li key={i} className="text-sm text-[#555] flex items-start gap-3">
                          <ShieldAlert size={16} className="text-amber-500 shrink-0 mt-0.5" />
                          <span className="font-semibold">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* AI Analysis Section */}
                <div className="pt-8">
                  {!aiAnalysis ? (
                    <div className="bg-gradient-to-br from-gray-900 to-slate-800 p-12 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
                      <h4 className="text-3xl font-bold mb-4 relative z-10">Advanced AI Analysis</h4>
                      <p className="text-white/60 mb-10 max-w-md mx-auto font-medium relative z-10">
                        Get a personalized report on your career paths, relationship dynamics, and personal growth strategies.
                      </p>
                      <button 
                        onClick={() => handleAiAnalysis(result.type)}
                        disabled={isAnalyzing}
                        className="px-12 py-5 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-3 mx-auto disabled:opacity-50 relative z-10"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="w-5 h-5 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles size={20} className="text-teal-500" />
                            Generate My AI Report
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-12 rounded-[3rem] border border-[#f0f0f0] shadow-sm"
                    >
                      <div className="flex items-center gap-4 mb-10">
                        <div className={`p-3 rounded-2xl ${group.bg} text-white shadow-lg`}>
                          <Sparkles size={24} />
                        </div>
                        <h4 className="text-2xl font-bold text-[#333]">AI Growth Strategy</h4>
                      </div>
                      <div className="prose prose-slate max-w-none text-[#555] leading-relaxed whitespace-pre-wrap font-medium text-lg">
                        {aiAnalysis}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Right Column: Sidebar */}
              <div className="lg:col-span-1 space-y-10">
                <div className="bg-[#f8f9fa] p-8 rounded-[2.5rem] border border-[#f0f0f0]">
                  <h3 className="text-lg font-bold text-[#333] flex items-center gap-3 mb-6">
                    <Target size={20} className={group.text} /> Career Paths
                  </h3>
                  <div className="space-y-3">
                    {description.careers.map((career, i) => (
                      <div key={i} className="px-5 py-4 bg-white text-[#555] text-sm font-bold rounded-2xl border border-[#eee] flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${group.bg}`} />
                        {career}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f8f9fa] p-8 rounded-[2.5rem] border border-[#f0f0f0]">
                  <h3 className="text-lg font-bold text-[#333] flex items-center gap-3 mb-6">
                    <RotateCcw size={20} className="text-[#9e9e9e]" /> Not your type?
                  </h3>
                  <p className="text-xs text-[#9e9e9e] font-medium mb-6 leading-relaxed">
                    If you feel this doesn't represent you well, you can retake the test. Try to answer as honestly as possible.
                  </p>
                  <button 
                    onClick={resetQuiz}
                    className="w-full py-4 bg-white border-2 border-[#eee] text-[#666] rounded-2xl font-bold hover:border-[#33a474] hover:text-[#33a474] transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} />
                    Retake Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentIndex === -1) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full bg-white rounded-[3.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left: Visual */}
          <div className="md:w-1/2 bg-gradient-to-br from-teal-400 to-emerald-500 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-20%] w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-48 h-48 bg-white/20 backdrop-blur-md rounded-[3rem] flex items-center justify-center mb-8 shadow-2xl"
            >
              <Sparkles size={80} className="text-white drop-shadow-lg" />
            </motion.div>
            
            <h2 className="text-3xl font-bold mb-4 text-center">Discover Your True Self</h2>
            <p className="text-white/80 text-center max-w-xs leading-relaxed">
              Join millions of people who have taken the most accurate personality test in the world.
            </p>
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#333] mb-4">
                Personality Test
              </h1>
              <div className="h-1.5 w-20 bg-teal-500 rounded-full mb-6" />
              <p className="text-[#666] leading-relaxed font-medium">
                It's so incredible to finally be understood. Our test provides deep insights into who you are and why you do things the way you do.
              </p>
            </div>

            <div className="space-y-6 mb-10">
              {[
                { icon: <CheckCircle2 size={18} />, text: "93 Professional Questions" },
                { icon: <Brain size={18} />, text: "16 Detailed Personality Types" },
                { icon: <Sparkles size={18} />, text: "AI-Powered Growth Analysis" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-[#555] font-semibold">
                  <div className="text-teal-500">{item.icon}</div>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleStart}
              className="w-full py-5 bg-[#33a474] text-white rounded-[2rem] font-bold text-lg hover:bg-[#2d9166] transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 group"
            >
              Take the Test
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="mt-6 text-center text-[10px] text-[#9e9e9e] font-bold uppercase tracking-widest">
              Free · No Registration · 10 Minutes
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      {/* Header / Progress */}
      <div className="w-full max-w-4xl mx-auto pt-12 px-6">
        <div className="flex justify-between items-end mb-4">
          <div className="text-xs font-bold text-[#9e9e9e] uppercase tracking-[0.2em]">
            Question {currentIndex + 1} / {questions.length}
          </div>
          <div className="text-xs font-bold text-[#33a474] uppercase tracking-[0.2em]">
            {progress}% Complete
          </div>
        </div>
        <div className="h-4 w-full bg-white rounded-full overflow-hidden shadow-inner border border-[#f0f0f0]">
          <motion.div 
            className="h-full bg-[#33a474] rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-4xl w-full text-center"
          >
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#333] leading-tight max-w-2xl mx-auto">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="flex flex-col items-center gap-12">
              <div className="flex items-center justify-center gap-2 md:gap-6 w-full max-w-3xl">
                <span className="text-[11px] font-bold text-[#33a474] uppercase tracking-widest w-24 text-right hidden md:block">
                  {currentQuestion.options.A.text}
                </span>
                
                <div className="flex items-center justify-center gap-2 md:gap-4">
                  {[3, 2, 1, 0, -1, -2, -3].map((score) => {
                    const isActive = answers[currentQuestion.id] === score;
                    const size = Math.abs(score) === 3 ? 'w-16 h-16' : 
                                 Math.abs(score) === 2 ? 'w-12 h-12' : 
                                 Math.abs(score) === 1 ? 'w-10 h-10' : 'w-8 h-8';
                    
                    const color = score > 0 ? 'border-[#33a474]' : 
                                  score < 0 ? 'border-[#88619a]' : 'border-[#d1d1d1]';
                    
                    const activeBg = score > 0 ? 'bg-[#33a474]' : 
                                     score < 0 ? 'bg-[#88619a]' : 'bg-[#d1d1d1]';

                    return (
                      <button
                        key={score}
                        onClick={() => handleAnswer(score)}
                        className={`likert-circle ${size} ${color} ${isActive ? `${activeBg} scale-110 shadow-lg` : 'bg-white hover:bg-gray-50'}`}
                      />
                    );
                  })}
                </div>

                <span className="text-[11px] font-bold text-[#88619a] uppercase tracking-widest w-24 text-left hidden md:block">
                  {currentQuestion.options.B.text}
                </span>
              </div>

              {/* Mobile Labels */}
              <div className="flex md:hidden justify-between w-full max-w-[300px] text-[10px] font-bold uppercase tracking-widest">
                <span className="text-[#33a474]">{currentQuestion.options.A.text}</span>
                <span className="text-[#88619a]">{currentQuestion.options.B.text}</span>
              </div>
            </div>

            <div className="mt-20 flex justify-center">
              <button 
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all px-8 py-4 rounded-full ${currentIndex === 0 ? 'text-[#e5e5e5] cursor-not-allowed' : 'text-[#9e9e9e] hover:text-[#33a474] hover:bg-white shadow-sm'}`}
              >
                <ChevronLeft size={18} />
                Back
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="p-12 text-center">
        <p className="text-[10px] text-[#d1d1d1] font-bold uppercase tracking-[0.3em]">MBTI Personality Test · Discover Your True Self</p>
      </footer>
    </div>
  );
}
