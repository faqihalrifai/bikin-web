// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Loader animation
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    }

    // Mobile menu toggle
    document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});

    // Scroll to section smoothly
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll for cards and sections
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .section-title, .tool-card, .contact-form');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.card, .section-title, .tool-card, .contact-form');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    });

    // Initialize scroll animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // BMI Calculator
    if (document.getElementById('height') && document.getElementById('weight')) {
        document.querySelector('.tool-form button[onclick="calculateBMI()"]').addEventListener('click', calculateBMI);
    }

    // Calorie Calculator
    if (document.getElementById('age') && document.getElementById('gender')) {
        document.querySelector('.tool-form button[onclick="calculateCalories()"]').addEventListener('click', calculateCalories);
    }

    // AI Health Assistant
    if (document.getElementById('ai-input')) {
        document.getElementById('ai-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
        
        document.querySelector('.ai-chat-input button').addEventListener('click', sendAIMessage);
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        });
    });
});

// BMI Calculation Function
function calculateBMI() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const height = parseFloat(heightInput.value) / 100; // Convert cm to m
    const weight = parseFloat(weightInput.value);
    const resultDiv = document.getElementById('bmi-result');
    const detailsDiv = document.getElementById('bmi-details');
    
    if (height && weight) {
        const bmi = (weight / (height * height)).toFixed(1);
        let category, healthRisks, recommendations;
        
        if (bmi < 18.5) {
            category = "Underweight (Kekurangan berat badan)";
            healthRisks = "Risiko kesehatan termasuk kekurangan nutrisi, osteoporosis, sistem imun yang lemah, dan masalah kesuburan.";
            recommendations = `
                <ul>
                    <li>Tingkatkan asupan kalori dengan makanan bergizi</li>
                    <li>Fokus pada protein berkualitas seperti daging tanpa lemak, ikan, telur, dan kacang-kacangan</li>
                    <li>Latihan kekuatan untuk membangun massa otot</li>
                    <li>Konsultasi dengan ahli gizi untuk rencana makan khusus</li>
                </ul>
            `;
        } else if (bmi >= 18.5 && bmi < 23) {
            category = "Normal weight (Berat badan sehat)";
            healthRisks = "Risiko penyakit terkait berat badan rendah. Pertahankan gaya hidup sehat.";
            recommendations = `
                <ul>
                    <li>Pertahankan pola makan seimbang dengan berbagai nutrisi</li>
                    <li>Lakukan aktivitas fisik minimal 150 menit per minggu</li>
                    <li>Pantau berat badan secara berkala</li>
                    <li>Tetap terhidrasi dan cukup istirahat</li>
                </ul>
            `;
        } else if (bmi >= 23 && bmi < 27.5) {
            category = "Overweight (Kelebihan berat badan)";
            healthRisks = "Peningkatan risiko penyakit jantung, diabetes tipe 2, dan tekanan darah tinggi.";
            recommendations = `
                <ul>
                    <li>Kurangi asupan kalori sebanyak 300-500 kkal/hari</li>
                    <li>Tingkatkan aktivitas fisik dengan olahraga aerobik</li>
                    <li>Batasi makanan olahan dan tinggi gula</li>
                    <li>Tingkatkan asupan serat dari sayuran dan buah</li>
                </ul>
            `;
        } else {
            category = "Obesity (Obesitas)";
            healthRisks = "Risiko tinggi untuk penyakit jantung, stroke, diabetes tipe 2, sleep apnea, dan beberapa jenis kanker.";
            recommendations = `
                <ul>
                    <li>Konsultasi dengan dokter atau ahli gizi untuk rencana penurunan berat badan</li>
                    <li>Target penurunan berat badan 5-10% dari berat awal</li>
                    <li>Kombinasikan diet sehat dengan olahraga teratur</li>
                    <li>Pertimbangkan terapi perilaku untuk perubahan gaya hidup</li>
                </ul>
            `;
        }
        
        resultDiv.innerHTML = `
            <strong>BMI Anda:</strong> ${bmi}<br>
            <strong>Kategori:</strong> ${category}
        `;
        
        detailsDiv.innerHTML = `
            <h4>Detail BMI Anda:</h4>
            <p><strong>Kategori BMI menurut WHO:</strong><br>
            < 18.5 = Underweight<br>
            18.5 - 22.9 = Normal<br>
            23 - 27.4 = Overweight<br>
            ≥ 27.5 = Obese</p>
            <p><strong>Risiko Kesehatan:</strong> ${healthRisks}</p>
            <p><strong>Rekomendasi:</strong> ${recommendations}</p>
        `;
        
        detailsDiv.style.display = 'block';
    } else {
        alert("Silakan masukkan tinggi dan berat badan Anda");
    }
}

// Calorie Calculation Function
function calculateCalories() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height-calc').value);
    const weight = parseFloat(document.getElementById('weight-calc').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const resultDiv = document.getElementById('calorie-result');
    const detailsDiv = document.getElementById('calorie-details');
    
    if (age && gender && height && weight && activity) {
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
        
        const calories = Math.round(bmr * activity);
        const protein = Math.round(weight * 1.6); // 1.6g protein per kg berat badan
        const fat = Math.round((calories * 0.25) / 9); // 25% dari kalori, 9 kkal/g lemak
        const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
        
        resultDiv.innerHTML = `
            <strong>Kebutuhan Kalori Harian Anda:</strong> ${calories} kkal<br>
            <strong>Maintenance:</strong> ${calories} kkal/hari<br>
            <strong>Penurunan Berat Badan:</strong> ${calories-500} kkal/hari<br>
            <strong>Penambahan Berat Badan:</strong> ${calories+500} kkal/hari
        `;
        
        detailsDiv.innerHTML = `
            <h4>Detail Kebutuhan Kalori:</h4>
            <p><strong>Pembagian Makronutrien:</strong></p>
            <ul>
                <li>Protein: ${protein}g (${protein*4} kkal) - Untuk pertumbuhan dan perbaikan otot</li>
                <li>Lemak: ${fat}g (${fat*9} kkal) - Untuk hormon dan penyerapan vitamin</li>
                <li>Karbohidrat: ${carbs}g (${carbs*4} kkal) - Untuk energi</li>
            </ul>
            <p><strong>Tips Pola Makan Sehat:</strong></p>
            <ul>
                <li>Makan 3-5 kali sehari dengan porsi terkontrol</li>
                <li>Konsumsi protein setiap makan</li>
                <li>Pilih lemak sehat seperti alpukat, kacang-kacangan, dan minyak zaitun</li>
                <li>Utamakan karbohidrat kompleks seperti gandum utuh dan sayuran</li>
                <li>Minum air putih minimal 2 liter per hari</li>
                <li>Batasi gula tambahan dan makanan olahan</li>
            </ul>
        `;
        
        detailsDiv.style.display = 'block';
    } else {
        alert("Silakan lengkapi semua data");
    }
}

// AI Health Assistant Functions
const aiKnowledgeBase = {
    "diabetes": {
        response: `<strong>Diabetes Mellitus</strong> adalah penyakit metabolik dengan kadar gula darah tinggi.<br><br>
        <strong>Gejala umum:</strong>
        <ul>
            <li>Sering haus dan buang air kecil</li>
            <li>Lapar terus menerus</li>
            <li>Penurunan berat badan tanpa sebab</li>
            <li>Penglihatan kabur</li>
            <li>Luka sulit sembuh</li>
            <li>Kelelahan</li>
        </ul>`,
        sources: [
            {name: "WHO", url: "https://www.who.int/news-room/fact-sheets/detail/diabetes"}
        ]
    },
    "diet sehat": {
        response: `<strong>Panduan Diet Sehat untuk Menurunkan Berat Badan</strong><br><br>
        <strong>1. Defisit Kalori:</strong> Kurangi 300-500kkal dari kebutuhan harian<br>
        <strong>2. Pembagian Makronutrien:</strong>
        <ul>
            <li>Protein: 1.6-2.2g/kg berat badan (ayam, ikan, telur, tempe)</li>
            <li>Lemak sehat: 25-30% kalori (alpukat, kacang, minyak zaitun)</li>
            <li>Karbohidrat kompleks: 45-55% kalori (beras merah, quinoa, ubi)</li>
        </ul>`,
        sources: [
            {name: "Harvard Nutrition", url: "https://www.hsph.harvard.edu/nutritionsource/healthy-weight/"}
        ]
    }
};

function findAIResponse(query) {
    query = query.toLowerCase();
    const specificResponses = {
        "gejala diabetes": "diabetes",
        "cara mencegah diabetes": "diabetes",
        "menu diet sehat": "diet sehat",
        "cara menurunkan berat badan": "diet sehat"
    };
    
    for (const [key, value] of Object.entries(specificResponses)) {
        if (query.includes(key)) {
            return aiKnowledgeBase[value];
        }
    }
    
    const keywords = {
        "diabet": "diabetes",
        "gula darah": "diabetes",
        "diet": "diet sehat",
        "nutrisi": "diet sehat"
    };
    
    for (const [key, value] of Object.entries(keywords)) {
        if (query.includes(key)) {
            return aiKnowledgeBase[value];
        }
    }
    
    return {
        response: `Maaf, saya tidak menemukan informasi spesifik tentang "${query}". Anda bisa mencoba pertanyaan seperti:<br>
        <ul>
            <li>"Apa gejala umum penyakit jantung?"</li>
            <li>"Bagaimana cara meningkatkan kualitas tidur?"</li>
            <li>"Makanan apa yang baik untuk daya tahan tubuh?"</li>
        </ul>`,
        sources: []
    };
}

function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();
    const chatMessages = document.getElementById('ai-chat-messages');
    
    if (message === '') return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'ai-message user';
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);
    
    // Clear input
    input.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'ai-message bot';
    typingIndicator.innerHTML = '<span class="ai-loading"></span> Sedang menganalisis...';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Get AI response after short delay
    setTimeout(() => {
        chatMessages.removeChild(typingIndicator);
        
        const aiResponse = findAIResponse(message);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'ai-message bot';
        aiMessage.innerHTML = aiResponse.response;
        
        if (aiResponse.sources.length > 0) {
            const sourcesDiv = document.createElement('div');
            sourcesDiv.className = 'ai-sources';
            sourcesDiv.innerHTML = '<strong>Sumber:</strong> ' + 
                aiResponse.sources.map(source => 
                    `<a href="${source.url}" target="_blank">${source.name}</a>`
                ).join(' | ');
            aiMessage.appendChild(sourcesDiv);
        }
        
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
}

function insertExample(text) {
    const input = document.getElementById('ai-input');
    input.value = text;
    input.focus();
}