export interface MBTIDescription {
  title: string;
  role: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
}

export const mbtiDescriptions: Record<string, MBTIDescription> = {
  ISTJ: {
    title: "Logistician",
    role: "Sentinel",
    description: "Quiet, serious, earn success by thoroughness and dependability. Practical, matter-of-fact, realistic, and responsible. Decide logically what should be done and work toward it steadily, regardless of distractions. Take pleasure in making everything orderly and organized—their work, their home, their life. Value traditions and loyalty.",
    strengths: ["Honest and Direct", "Strong-willed and Dutiful", "Very Responsible", "Calm and Practical"],
    weaknesses: ["Stubborn", "Insensitive", "Always by the Book", "Often Unreasonably Blame Themselves"],
    careers: ["Accountant", "Auditor", "Civil Servant", "Engineer", "Legal Professional"]
  },
  ISFJ: {
    title: "Defender",
    role: "Sentinel",
    description: "Quiet, friendly, responsible, and conscientious. Committed and steady in meeting their obligations. Thorough, painstaking, and accurate. Loyal, considerate, notice and remember specifics about people who are important to them, concerned with how others feel. Strive to create an orderly and harmonious environment at work and at home.",
    strengths: ["Supportive", "Reliable and Patient", "Observant", "Enthusiastic and Loyal"],
    weaknesses: ["Overly Humble and Shy", "Take Things Too Personally", "Repress Their Feelings", "Overload Themselves"],
    careers: ["Nurse", "Social Worker", "Administrative Assistant", "Librarian", "Preschool Teacher"]
  },
  INFJ: {
    title: "Advocate",
    role: "Diplomat",
    description: "Seek meaning and connection in ideas, relationships, and material possessions. Want to understand what motivates people and are insightful about others. Conscientious and committed to their firm values. Develop a clear vision about how best to serve the common good. Organized and decisive in implementing their vision.",
    strengths: ["Creative", "Insightful", "Principled", "Passionate and Altruistic"],
    weaknesses: ["Sensitive to Criticism", "Extremely Perfectionistic", "Prone to Burnout", "Overly Idealistic"],
    careers: ["Counseling Psychologist", "Writer", "Art Director", "Human Resources Manager", "Non-profit Leader"]
  },
  INTJ: {
    title: "Architect",
    role: "Analyst",
    description: "Have original minds and great drive for implementing their ideas and achieving their goals. Quickly see patterns in external events and develop long-range explanatory perspectives. When committed, organize a job and carry it through. Skeptical and independent, have high standards of competence and performance—for themselves and others.",
    strengths: ["Logical and Analytical", "Independent and Decisive", "Strategic Thinking", "Determined"],
    weaknesses: ["Arrogant", "Dismissive of Emotions", "Over-analytical", "Socially Detached"],
    careers: ["Software Architect", "Strategic Consultant", "Scientist", "Financial Analyst", "University Professor"]
  },
  ISTP: {
    title: "Virtuoso",
    role: "Explorer",
    description: "Tolerant and flexible, quiet observers until a problem appears, then act quickly to find workable solutions. Analyze what makes things work and readily get through large amounts of data to isolate the core of practical problems. Interested in cause and effect, organize facts using logical principles, value efficiency.",
    strengths: ["Optimistic and Energetic", "Creative and Practical", "Calm in a Crisis", "Spontaneous and Rational"],
    weaknesses: ["Stubborn", "Insensitive", "Easily Bored", "Dislike Long-term Commitments"],
    careers: ["Mechanical Engineer", "Pilot", "Forensic Scientist", "System Administrator", "Carpenter"]
  },
  ISFP: {
    title: "Adventurer",
    role: "Explorer",
    description: "Quiet, friendly, sensitive, and kind. Enjoy the present moment, what's going on around them. Like to have their own space and to work within their own time frame. Loyal and committed to their values and to people who are important to them. Dislike disagreements and conflicts, do not force their opinions or values on others.",
    strengths: ["Charming", "Sensitive to Others", "Imaginative", "Passionate"],
    weaknesses: ["Fiercely Independent", "Unpredictable", "Easily Stressed", "Overly Competitive"],
    careers: ["Designer", "Musician", "Photographer", "Veterinarian", "Landscape Architect"]
  },
  INFP: {
    title: "Mediator",
    role: "Diplomat",
    description: "Idealistic, loyal to their values and to people who are important to them. Want an external life that is congruent with their values. Curious, quick to see possibilities, can be catalysts for implementing ideas. Seek to understand people and to help them fulfill their potential. Adaptable, flexible, and accepting unless a value is threatened.",
    strengths: ["Open-minded", "Empathetic", "Extremely Creative", "True to Themselves"],
    weaknesses: ["Overly Idealistic", "Self-Critical", "Impractical", "Difficult to Handle Conflict"],
    careers: ["Writer", "Artist", "Psychologist", "Social Worker", "Editor"]
  },
  INTP: {
    title: "Logician",
    role: "Analyst",
    description: "Seek to develop logical explanations for everything that interests them. Theoretical and abstract, interested more in ideas than in social interaction. Quiet, contained, flexible, and adaptable. Have unusual ability to focus in depth to solve problems in their area of interest. Skeptical, sometimes critical, always analytical.",
    strengths: ["Analytical Ability", "Originality", "Open-minded", "Objective"],
    weaknesses: ["Disconnected from Reality", "Insensitive to Others' Feelings", "Self-doubting", "Difficulty Following Routine"],
    careers: ["Programmer", "Mathematician", "Theoretical Physicist", "Systems Analyst", "Philosopher"]
  },
  ESTP: {
    title: "Entrepreneur",
    role: "Explorer",
    description: "Flexible and tolerant, they take a pragmatic approach focused on immediate results. Theories and conceptual explanations bore them—they want to act energetically to solve the problem. Focus on the here-and-now, spontaneous, enjoy each moment that they can be active with others. Enjoy material comforts and style. Learn best through doing.",
    strengths: ["Bold", "Rational and Practical", "Socially Adept", "Perceptive"],
    weaknesses: ["Impatient", "Risk-prone", "Ignore Long-term Impact", "Unstructured"],
    careers: ["Sales Manager", "Entrepreneur", "Police Officer", "Sports Coach", "Emergency Medical Technician"]
  },
  ESFP: {
    title: "Entertainer",
    role: "Explorer",
    description: "Outgoing, friendly, and accepting. Exuberant lovers of life, people, and material comforts. Enjoy working with others to make things happen. Bring common sense and a realistic approach to their work, and make work fun. Flexible and spontaneous, adapt readily to new people and environments. Learn best by trying a new skill with others.",
    strengths: ["Bold", "Original", "Showmanship", "Practical Ability"],
    weaknesses: ["Easily Bored", "Lack Long-term Planning", "Sensitive to Criticism", "Overly Focused on Sensory Stimulation"],
    careers: ["Actor", "PR Specialist", "Travel Consultant", "Event Planner", "Interior Designer"]
  },
  ENFP: {
    title: "Campaigner",
    role: "Diplomat",
    description: "Warmly enthusiastic and imaginative. See life as full of possibilities. Make connections between events and information very quickly, and confidently proceed based on the patterns they see. Want a lot of affirmation from others, and readily give appreciation and support. Spontaneous and flexible, often rely on their ability to improvise and their verbal fluency.",
    strengths: ["Curious", "Observant", "Energetic and Enthusiastic", "Excellent Communicator"],
    weaknesses: ["Difficulty Focusing", "Overthinking", "Easily Stressed", "Overly Emotional"],
    careers: ["Marketing Planner", "Journalist", "Art Director", "Training Instructor", "Creative Director"]
  },
  ENTP: {
    title: "Debater",
    role: "Analyst",
    description: "Quick, ingenious, stimulating, alert, and outspoken. Resourceful in solving new and challenging problems. Adept at generating theoretical possibilities and then analyzing them strategically. Good at reading other people. Bored by routine, will seldom do the same thing the same way, apt to turn to one new interest after another.",
    strengths: ["Knowledgeable", "Quick Thinker", "Original Thinker", "Energetic"],
    weaknesses: ["Argumentative", "Insensitive", "Difficulty Focusing on Execution", "Impatient"],
    careers: ["Lawyer", "Inventor", "Entrepreneur", "Advertising Creative", "Political Consultant"]
  },
  ESTJ: {
    title: "Executive",
    role: "Sentinel",
    description: "Practical, realistic, matter-of-fact. Decisive, quickly move to implement decisions. Organize projects and people to get things done, focus on getting results in the most efficient way possible. Take care of routine details. Have a clear set of logical standards, systematically follow them and want others to also. Forceful in implementing their plans.",
    strengths: ["Dedicated", "Strong-willed", "Honest and Direct", "Excellent Organizer"],
    weaknesses: ["Opinionated", "Inflexible", "Difficulty Expressing Emotions", "Overly Focused on Social Status"],
    careers: ["Bank Manager", "Project Manager", "Factory Supervisor", "Military Officer", "Judge"]
  },
  ESFJ: {
    title: "Consul",
    role: "Sentinel",
    description: "Warmhearted, conscientious, and cooperative. Want harmony in their environment, work with determination to establish it. Like to work with others to complete tasks accurately and on time. Loyal, follow through even in small matters. Notice what others need in their day-to-day lives and try to provide it. Want to be appreciated for who they are and what they contribute.",
    strengths: ["Strong Sense of Duty", "Loyal and Reliable", "Good at Connecting with People", "Warm and Considerate"],
    weaknesses: ["Sensitive to Social Status", "Inflexible", "Difficulty Handling Conflict", "Overly Needy for Affirmation"],
    careers: ["HR Specialist", "Elementary Teacher", "Account Manager", "Head Nurse", "Office Manager"]
  },
  ENFJ: {
    title: "Protagonist",
    role: "Diplomat",
    description: "Warm, empathetic, responsive, and responsible. Highly attuned to the emotions, needs, and motivations of others. Find potential in everyone, want to help others fulfill their potential. May act as catalysts for individual and group growth. Loyal, responsive to praise and criticism. Sociable, facilitate others in a group, and provide inspiring leadership.",
    strengths: ["Charming", "Altruistic", "Natural Leader", "Highly Empathetic"],
    weaknesses: ["Overly Idealistic", "Overly Sensitive", "Fragile Self-esteem", "Difficulty Making Tough Decisions"],
    careers: ["Non-profit Leader", "PR Manager", "Training Specialist", "Sales Manager", "Counselor"]
  },
  ENTJ: {
    title: "Commander",
    role: "Analyst",
    description: "Frank, decisive, assume leadership readily. Quickly see illogical and inefficient procedures and policies, develop and implement comprehensive systems to solve organizational problems. Enjoy long-term planning and goal setting. Usually well informed, enjoy expanding their knowledge and passing it on to others. Forceful in presenting their ideas.",
    strengths: ["Highly Efficient", "Self-confident", "Strong-willed", "Strategic Thinker"],
    weaknesses: ["Stubborn and Arrogant", "Lack of Empathy", "Impatient", "Ruthless"],
    careers: ["CEO", "Lawyer", "Management Consultant", "Entrepreneur", "University Administrator"]
  }
};
