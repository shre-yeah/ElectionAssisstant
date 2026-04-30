const translations = {
  en: {
    appTitle: "Indian Election Assistant",
    tagline: "Your interactive guide to the democratic process",
    langToggle: "हिंदी में देखें",
    
    // Timeline section
    timelineTitle: "Election Timeline",
    timelineStep1Title: "Notification",
    timelineStep1Desc: "Official announcement of the election schedule by the Election Commission.",
    timelineStep2Title: "Nominations",
    timelineStep2Desc: "Candidates file their nomination papers.",
    timelineStep3Title: "Scrutiny & Withdrawal",
    timelineStep3Desc: "Checking of nominations and last date to withdraw.",
    timelineStep4Title: "Campaigning",
    timelineStep4Desc: "Candidates campaign. Stops 48 hours before polling.",
    timelineStep5Title: "Polling Day",
    timelineStep5Desc: "Voters cast their votes at polling stations.",
    timelineStep6Title: "Counting Day",
    timelineStep6Desc: "Votes are counted and results are declared.",

    // Steps Section
    stepsTitle: "How to Vote",
    step1Title: "1. Register to Vote",
    step1Desc: "Apply for a Voter ID (EPIC) via Form 6 on the NVSP portal or Voter Helpline App. You must be an Indian citizen and 18+ years old.",
    step2Title: "2. Check Voter List",
    step2Desc: "Verify your name in the Electoral Roll online or via SMS to ensure you can vote.",
    step3Title: "3. Find Polling Booth",
    step3Desc: "Locate your designated polling station online using your EPIC number.",
    step4Title: "4. Cast Your Vote",
    step4Desc: "Bring your Voter ID (or approved alternative ID). Press the EVM button next to your chosen candidate, and verify via VVPAT.",

    // Chat Assistant
    chatHeader: "Election Assistant",
    chatGreeting: "Hello! I am your Election Assistant. How can I help you today?",
    chatInputPlaceholder: "Ask a question or select an option...",
    chatSendButton: "Send",
    audioOnBtn: "Turn Audio On",
    audioOffBtn: "Turn Audio Off",

    // Quick Replies for Chat
    qrRegister: "How do I register?",
    qrDocs: "What documents are needed?",
    qrEVM: "How to use an EVM?",

    // Chat Responses
    ansRegister: "To register, fill out Form 6 online on the Voters' Service Portal (voters.eci.gov.in) or use the Voter Helpline App. You need proof of age and residence.",
    ansDocs: "You need your Voter ID (EPIC). If you don't have it, you can use Aadhaar, PAN Card, Driving License, Passport, or MNREGA Job Card, provided your name is on the voter list.",
    ansEVM: "At the polling booth, press the blue button on the EVM next to the symbol of the candidate of your choice. A red light will glow and you will hear a long beep sound. You can also verify your vote on the VVPAT slip.",
    ansDefault: "I'm sorry, I couldn't understand that. You can ask me how to register, what documents are needed, or how to use the EVM."
  },
  hi: {
    appTitle: "भारतीय चुनाव सहायक",
    tagline: "लोकतांत्रिक प्रक्रिया के लिए आपका संवादात्मक मार्गदर्शक",
    langToggle: "View in English",
    
    // Timeline section
    timelineTitle: "चुनाव की समय सीमा",
    timelineStep1Title: "अधिसूचना",
    timelineStep1Desc: "चुनाव आयोग द्वारा चुनाव कार्यक्रम की आधिकारिक घोषणा।",
    timelineStep2Title: "नामांकन",
    timelineStep2Desc: "उम्मीदवार अपना नामांकन पत्र दाखिल करते हैं।",
    timelineStep3Title: "जांच और नाम वापसी",
    timelineStep3Desc: "नामांकन की जांच और नाम वापस लेने की अंतिम तिथि।",
    timelineStep4Title: "प्रचार",
    timelineStep4Desc: "उम्मीदवार प्रचार करते हैं। मतदान से 48 घंटे पहले प्रचार बंद हो जाता है।",
    timelineStep5Title: "मतदान का दिन",
    timelineStep5Desc: "मतदाता मतदान केंद्रों पर अपना वोट डालते हैं।",
    timelineStep6Title: "मतगणना का दिन",
    timelineStep6Desc: "वोटों की गिनती होती है और परिणाम घोषित किए जाते हैं।",

    // Steps Section
    stepsTitle: "मतदान कैसे करें",
    step1Title: "1. मतदान के लिए पंजीकरण करें",
    step1Desc: "NVSP पोर्टल या वोटर हेल्पलाइन ऐप पर फॉर्म 6 के माध्यम से वोटर आईडी (EPIC) के लिए आवेदन करें। आपकी आयु 18+ होनी चाहिए।",
    step2Title: "2. मतदाता सूची की जाँच करें",
    step2Desc: "यह सुनिश्चित करने के लिए कि आप वोट दे सकते हैं, ऑनलाइन या SMS के माध्यम से मतदाता सूची में अपना नाम सत्यापित करें।",
    step3Title: "3. मतदान केंद्र खोजें",
    step3Desc: "अपने EPIC नंबर का उपयोग करके ऑनलाइन अपना निर्धारित मतदान केंद्र खोजें।",
    step4Title: "4. अपना वोट डालें",
    step4Desc: "अपना वोटर आईडी (या स्वीकृत वैकल्पिक आईडी) लाएं। अपने चुने हुए उम्मीदवार के बगल में EVM बटन दबाएं, और VVPAT के माध्यम से सत्यापित करें।",

    // Chat Assistant
    chatHeader: "चुनाव सहायक",
    chatGreeting: "नमस्ते! मैं आपका चुनाव सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    chatInputPlaceholder: "कोई प्रश्न पूछें या विकल्प चुनें...",
    chatSendButton: "भेजें",
    audioOnBtn: "ऑडियो चालू करें",
    audioOffBtn: "ऑडियो बंद करें",

    // Quick Replies for Chat
    qrRegister: "पंजीकरण कैसे करें?",
    qrDocs: "कौन से दस्तावेज़ चाहिए?",
    qrEVM: "EVM का उपयोग कैसे करें?",

    // Chat Responses
    ansRegister: "पंजीकरण करने के लिए, मतदाता सेवा पोर्टल (voters.eci.gov.in) पर ऑनलाइन फॉर्म 6 भरें या वोटर हेल्पलाइन ऐप का उपयोग करें।",
    ansDocs: "आपको अपना वोटर आईडी (EPIC) चाहिए। यदि नहीं है, तो आप आधार, पैन कार्ड, ड्राइविंग लाइसेंस आदि का उपयोग कर सकते हैं, बशर्ते आपका नाम मतदाता सूची में हो।",
    ansEVM: "EVM पर अपनी पसंद के उम्मीदवार के चुनाव चिह्न के बगल वाला नीला बटन दबाएं। एक लाल बत्ती जलेगी और एक बीप की आवाज़ आएगी।",
    ansDefault: "क्षमा करें, मैं वह समझ नहीं पाया। आप मुझसे पंजीकरण, दस्तावेज़ या EVM के बारे में पूछ सकते हैं।"
  }
};
