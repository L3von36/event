export type Language = 'en' | 'am';

export const translations = {
    en: {
        nav: {
            home: 'Home',
            services: 'Services',
            events: 'Events',
            testimonials: 'Testimonials',
            contact: 'Contact',
            book: 'Book an Event',
        },
        hero: {
            headline_prefix: 'We Create Unforgettable',
            headline_span: 'Events in Ethiopia',
            subheadline: 'From traditional weddings to corporate conferences, we bring your vision to life with cultural elegance and professional execution.',
            cta_primary: 'Request a Quote',
            cta_secondary: 'View Our Events',
        },
        services: {
            title: 'Our Services',
            description: 'We provide comprehensive event management services designed to make every occasion extraordinary.',
            items: [
                { name: 'Wedding Planning', desc: 'Traditional and modern Ethiopian weddings tailored to your dreams.' },
                { name: 'Corporate Events', desc: 'Professional conferences, product launches, and business meetings.' },
                { name: 'Cultural & Religious Events', desc: 'Timket, Meskel, holidays, and large-scale church gatherings.' },
                { name: 'Concerts & Festivals', desc: 'Full-scale stage, sound, and crowd management for major events.' },
                { name: 'Decoration & Setup', desc: 'Breathtaking venue design, lighting, and cultural aesthetics.' },
            ],
        },
        events: {
            title: 'Featured Events',
            description: 'Explore our portfolio of successfully delivered events across Ethiopia.',
            cta: 'View Portfolio',
            view_gallery: 'View Gallery',
            items: [
                { title: 'Royal Ethiopian Wedding', category: 'Wedding', location: 'Addis Ababa' },
                { title: 'Tech Innovation Summit', category: 'Corporate', location: 'Skylight Hotel' },
                { title: 'Meskel Celebration', category: 'Cultural', location: 'Meskel Square' },
                { title: 'Summer Music Festival', category: 'Concert', location: 'Ghion Hotel' },
            ]
        },
        why_us: {
            title: 'Why Choose Us?',
            description: 'We combine international standards with local expertise to deliver seamless, world-class events in Ethiopia. Our dedication to perfection ensures your peace of mind.',
            reasons: [
                "Experienced local event professionals",
                "Reliable wide network of Ethiopian vendors",
                "On-time and on-budget delivery guarantee",
                "Deeply culturally aware planning and design",
                "End-to-end event management from A to Z"
            ],
            placeholder: 'Professional Team',
        },
        testimonials: {
            title: 'What Our Clients Say',
            description: "Don't just take our word for it. Here is feedback from some of our happy clients.",
            items: [
                { quote: "They made our dream wedding a reality. The attention to cultural details was impressive. Highly recommended!", author: "Bethlehem & Abel", role: "Wedding Clients" },
                { quote: "Professional, timely, and creative. Our annual corporate conference was a huge success thanks to the team.", author: "EthioTelecom", role: "Corporate Partner" },
                { quote: "Organizing a festival from abroad was scary, but they handled everything perfectly. The diaspora community loved it.", author: "Samuel Tedesco", role: "Concert Promoter" },
            ]
        },
        contact: {
            title: "Let's Plan Your Next Event",
            description: 'Ready to create something unforgettable? Fill out the form, and our team will get back to you with a personalized proposal.',
            labels: {
                phone: 'Phone',
                email: 'Email',
                location: 'Location',
                name: 'Full Name',
                eventType: 'Event Type',
                message: 'Message',
                submit: 'Send Inquiry',
            },
            form: {
                name_placeholder: 'John Doe',
                email_placeholder: 'john@example.com',
                phone_placeholder: '+251...',
                message_placeholder: 'Tell us about your event...',
                types: ['Wedding', 'Corporate', 'Cultural', 'Other']
            }
        },
        footer: {
            description: 'Your premier partner for creating unforgettable experiences in Ethiopia. Professional, reliable, and culturally rooted.',
            quick_links: 'Quick Links',
            services_title: 'Services',
            connect: 'Connect With Us',
            newsletter: 'Subscribe to our newsletter',
            email_placeholder: 'Email address',
            go: 'Go',
            rights: '© 2024 EventEthio. All rights reserved.',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
        },
        faq: {
            title: 'Frequently Asked Questions',
            description: 'Everything you need to know about our event planning process.',
            items: [
                { q: 'How far in advance should I book?', a: 'For major weddings and large conferences, we recommend booking at least 6-12 months in advance. Smaller corporate events can be often arranged within 2-3 months.' },
                { q: 'Do you handle events outside of Addis Ababa?', a: 'Yes! We coordinate destination weddings and corporate retreats across Ethiopia, including Lalibela, Bahir Dar, and Hawassa.' },
                { q: 'What is your payment structure?', a: 'We typically require a 30% deposit to secure your date, 40% midway through planning, and the final 30% one week before the event.' }
            ]
        },
        estimator: {
            title: 'Budget Estimator',
            description: 'Get a quick estimate for your event in seconds.',
            labels: {
                guests: 'Number of Guests',
                service_level: 'Service Level',
                total: 'Estimated Total',
                range: 'Estimated Range (ETB)',
                disclaimer: 'This is an approximation based on current market rates.'
            },
            levels: ['Essential', 'Premium', 'Elite']
        },
        chat: {
            greeting: 'Hello! How can we help you today?',
            telegram: 'Chat on Telegram',
            whatsapp: 'Chat on WhatsApp',
            we_are_online: 'We are online'
        },
        identity: {
            title: 'Our Strategic Foundation',
            subtitle: 'Built on excellence, driven by results.',
            vision: {
                title: 'Vision',
                content: 'To be the leading events management service provider for corporate events, delivering exceptional experiences and exceeding client expectations.'
            },
            mission: {
                title: 'Mission',
                content: 'To create memorable and impactful corporate events that engage and inspire attendees, leaving a lasting impression on both clients and participants.'
            },
            goals: {
                title: 'Core Goals',
                items: [
                    { title: 'Client Satisfaction', desc: 'Strive to consistently meet and surpass client expectations by providing top-notch event management services.' },
                    { title: 'Exceptional Experiences', desc: 'Create unique and innovative event concepts that captivate attendees and leave a lasting impression.' },
                    { title: 'Professionalism & Reliability', desc: 'Establish a reputation for delivering events with the utmost professionalism and reliability.' },
                    { title: 'Growth & Expansion', desc: 'Expand the client base by consistently delivering successful events.' },
                    { title: 'Industry Leadership', desc: 'Become an industry leader in corporate event management, consistently setting trends and raising the standard of excellence.' }
                ]
            },
            objectives: {
                title: 'Strategic Objectives',
                items: [
                    'Offer comprehensive event planning services tailored to the specific needs and requirements of corporate clients.',
                    'Provide meticulous attention to detail in all aspects of event management, including venue selection, logistics, catering, audiovisuals, and entertainment.',
                    'Collaborate closely with clients to understand their brand identity, values, and objectives, to ensure the event aligns perfectly with their vision.',
                    'Implement effective marketing and promotion strategies to create buzz and attract the desired target audience.',
                    'Utilize technology and event management tools to streamline processes, enhance efficiency, and deliver superior results.',
                    'Foster strong relationships with vendors and suppliers to ensure access to high-quality and reliable services.',
                    'Continuously stay updated with the latest trends and innovations in the events industry, incorporating them into event concepts and design.',
                    'Monitor and evaluate the success of each event, gathering feedback from clients and attendees, and implementing improvements for future events.'
                ]
            }
        }
    },
    am: {
        nav: {
            home: 'መነሻ',
            services: 'አገልግሎቶች',
            events: 'ዝግጅቶች',
            testimonials: 'ምስክርነቶች',
            contact: 'ያግኙን',
            book: 'ዝግጅት ይያዙ',
        },
        hero: {
            headline_prefix: 'የማይረሱ',
            headline_span: 'ዝግጅቶችን በኢትዮጵያ',
            subheadline: 'ከባህላዊ ሰርግ እስከ ኮርፖሬት ስብሰባዎች፣ ራዕይዎን በባህላዊ ውበት እና በሙያዊ ብቃት ወደ እውን እንለውጣለን።',
            cta_primary: 'ዋጋ ይጠይቁ',
            cta_secondary: 'ዝግጅቶቻችንን ይመልከቱ',
        },
        services: {
            title: 'አገልግሎቶቻችን',
            description: 'እያንዳንዱን ዝግጅት ልዩ ለማድረግ የተነደፉ አጠቃላይ የዝግጅት አስተዳደር አገልግሎቶችን እንሰጣለን።',
            items: [
                { name: 'የሰርግ ዝግጅት', desc: 'እንደ ህልምዎ የተዘጋጁ ባህላዊ እና ዘመናዊ የኢትዮጵያ ሰርጎች።' },
                { name: 'የኮርፖሬት ዝግጅቶች', desc: 'ሙያዊ ኮንፈረንሶች፣ የምርት ማስጀመሪያዎች እና የንግድ ስብሰባዎች።' },
                { name: 'ባህላዊ እና ሃይማኖታዊ', desc: 'ጥምቀት፣ መስቀል፣ በዓላት እና ትላልቅ የቤተክርስቲያን ጉባኤዎች።' },
                { name: 'ኮንሰርቶች እና ፌስቲቫሎች', desc: 'ለታላላቅ ዝግጅቶች ሙሉ የመድረክ፣ የድምጽ እና የህዝብ አስተዳደር።' },
                { name: 'ዲኮር እና ቅንብር', desc: 'አስደናቂ የቦታ ንድፍ፣ መብራት እና ባህላዊ ውበት።' },
            ],
        },
        events: {
            title: 'ተለይተው የቀረቡ',
            description: 'በመላው ኢትዮጵያ በተሳካ ሁኔታ ያከናወንናቸውን ዝግጅቶች ይመልከቱ።',
            cta: 'ፖርትፎሊዮ ይመልከቱ',
            view_gallery: 'ጋለሪ ይመልከቱ',
            items: [
                { title: 'የንጉሳዊ ሰርግ', category: 'ሰርግ', location: 'አዲስ አበባ' },
                { title: 'የቴክኖሎጂ ፈጠራ ጉባኤ', category: 'ኮርፖሬት', location: 'ስካይላይት ሆቴል' },
                { title: 'የመስቀል በዓል አከባበር', category: 'ባህላዊ', location: 'መስቀል አደባባይ' },
                { title: 'የበጋ ሙዚቃ ፌስቲቫል', category: 'ኮንሰርት', location: 'ጊዮን ሆቴል' },
            ]
        },
        why_us: {
            title: 'ለምን እኛን ይምረጡ?',
            description: 'ዓለም አቀፍ ደረጃዎችን ከአካባቢ እውቀት ጋር በማጣመር እንከን የለሽ፣ ዓለም አቀፍ ደረጃቸውን የጠበቁ ዝግጅቶችን በኢትዮጵያ እናቀርባለን።',
            reasons: [
                "ልምድ ያላቸው የአካባቢ ዝግጅት ባለሙያዎች",
                "ሰፊ እና አስተማማኝ አቅራቢዎች መረብ",
                "በሰዓቱ እና በበጀት የማስረከብ ዋስትና",
                "ባህልን ያገናዘበ እቅድ እና ንድፍ",
                "ከሀ እስከ ፖ የተሟላ የዝግጅት አስተዳደር"
            ],
            placeholder: 'ፕሮፌሽናል ቡድን',
        },
        testimonials: {
            title: 'ደንበኞቻችን ምን ይላሉ',
            description: "የእኛን ቃል ብቻ አይስሙ። ከተወሰኑ ደስተኛ ደንበኞቻችን የተሰጠ አስተያየት እነሆ።",
            items: [
                { quote: "የህልም ሰርጋችንን እውን አደረጉት። ለባህላዊ ዝርዝሮች የነበራቸው ትኩረት አስደናቂ ነበር። በጣም እንመክራቸዋለን!", author: "ቤተልሄም እና አቤል", role: "የሰርግ ደንበኞች" },
                { quote: "ፕሮፌሽናል፣ በሰዓቱ አክባሪ እና ፈጣሪ። ቡድኑ ላደረገው አስተዋጽኦ ዓመታዊ የኮርፖሬት ኮንፈረንሳችን ትልቅ ስኬት ነበር።", author: "ኢትዮ ቴሌኮም", role: "የኮርፖሬት አጋር" },
                { quote: "ከውጭ ሆነን ፌስቲቫል ማዘጋጀት አስፈሪ ነበር፣ ነገር ግን ሁሉንም ነገር ፍጹም አድርገው አቀናብረውታል።", author: "ሳሙኤል ተድላ", role: "ኮንሰርት አዘጋጅ" },
            ]
        },
        contact: {
            title: 'የሚቀጥለውን ዝግጅትዎን እናቅድ',
            description: 'የማይረሳ ነገር ለመፍጠር ዝግጁ ነዎት? ቅጹን ይሙሉ፣ እና ቡድናችን ከግል ፕሮፖዛል ጋር ይመለስልዎታል።',
            labels: {
                phone: 'ስልክ',
                email: 'ኢሜይል',
                location: 'አድራሻ',
                name: 'ሙሉ ስም',
                eventType: 'የዝግጅት አይነት',
                message: 'መልእክት',
                submit: 'ጥያቄ ላክ',
            },
            form: {
                name_placeholder: 'አበበ ከበደ',
                email_placeholder: 'abebe@example.com',
                phone_placeholder: '+251...',
                message_placeholder: 'ስለ ዝግጅትዎ ይንገሩን...',
                types: ['ሰርግ', 'ኮርፖሬት', 'ባህላዊ', 'ሌላ']
            }
        },
        footer: {
            description: 'የማይረሱ ልምዶችን በኢትዮጵያ ለመፍጠር ቀዳሚ አጋርዎ። ፕሮፌሽናል፣ አስተማማኝ እና በባህል የጎለበተ።',
            quick_links: 'ፈጣን ሊንኮች',
            services_title: 'አገልግሎቶች',
            connect: 'ይከታተሉን',
            newsletter: 'ለጋዜጣችን ይመዝገቡ',
            email_placeholder: 'የኢሜይል አድራሻ',
            go: 'ሂድ',
            rights: '© 2016 ኢቨንት ኢትዮ. መብቱ በህግ የተጠበቀ ነው።',
            privacy: 'የግላዊነት ፖሊሲ',
            terms: 'የአገልግሎት ውሎች',
        },
        faq: {
            title: 'ተደጋጋሚ ጥያቄዎች',
            description: 'ስለ ዝግጅት ማዘጋጀት ሂደት ማወቅ የሚገባዎት ነገሮች።',
            items: [
                { q: 'ከዝግጅቱ ስንት ጊዜ በፊት መያዝ አለብኝ?', a: 'ለትላልቅ ሰርጎች እና ስብሰባዎች ከ6-12 ወራት በፊት ቢይዙ ይመከራል። ለትንንሽ ዝግጅቶች ከ2-3 ወራት በፊት በቂ ነው።' },
                { q: 'ከአዲስ አበባ ውጭ ዝግጅቶችን ታዘጋጃላችሁ?', a: 'አዎ! በኢትዮጵያ ውስጥ በማንኛውም ቦታ (ላሊበላ፣ ባህር ዳር፣ ሀዋሳ...) ዝግጅቶችን እናዘጋጃለን።' },
                { q: 'የክፍያ ሁኔታው እንዴት ነው?', a: 'ቀኑን ለመያዝ 30%፣ በዝግጅት ሂደት ላይ 40%፣ እና ዝግጅቱ ከመጀመሩ ከአንድ ሳምንት በፊት ቀሪውን 30% ክፍያ እንቀበላለን።' }
            ]
        },
        estimator: {
            title: 'የዋጋ ግምት ማስያ',
            description: 'ለዝግጅትዎ የሚሆን ግምታዊ ዋጋ በጥቂት ሰከንዶች ውስጥ ያግኙ።',
            labels: {
                guests: 'የእንግዶች ብዛት',
                service_level: 'የአገልግሎት ደረጃ',
                total: 'ግምታዊ ጠቅላላ ዋጋ',
                range: 'ግምታዊ ዋጋ (በብር)',
                disclaimer: 'ይህ ዋጋ በወቅታዊ የገበያ ሁኔታ ላይ የተመሰረተ ግምት ነው።'
            },
            levels: ['መደበኛ', 'ከፍተኛ', 'ልዩ']
        },
        chat: {
            greeting: 'ሰላም! እንዴት ልንረዳዎ እንችላለን?',
            telegram: 'በቴሌግራም ያግኙን',
            whatsapp: 'በዋትስአፕ ያግኙን',
            we_are_online: 'መስመር ላይ ነን'
        },
        identity: {
            title: 'የእኛ ስልታዊ መሠረት',
            subtitle: 'በልህቀት ላይ የተገነባ፣ በውጤት የሚመራ።',
            vision: {
                title: 'ራዕይ',
                content: 'በኢትዮጵያ የኮርፖሬት ዝግጅቶች አስተዳደር ቀዳሚ በመሆን፣ ልዩ ልምዶችን መስጠት እና የደንበኞችን ፍላጎት ማርካት።'
            },
            mission: {
                title: 'ተልዕኮ',
                content: 'በደንበኞች እና በተሳታፊዎች ዘንድ ዘላቂ ትውስታን የሚተዉ፣ የሚስቡ እና የሚያነቃቁ ተፅእኖ ፈጣሪ የኮርፖሬት ዝግጅቶችን መፍጠር።'
            },
            goals: {
                title: 'ዋና ግቦች',
                items: [
                    { title: 'የደንበኛ እርካታ', desc: 'ከፍተኛ ጥራት ያለው አገልግሎት በመስጠት የደንበኞችን ፍላጎት በቋሚነት ማሟላት እና ማለፍ።' },
                    { title: 'ልዩ ተሞክሮዎች', desc: 'ተሳታፊዎችን የሚስቡ እና ዘላቂ ትውስታን የሚተዉ አዳዲስ የዝግጅት ሃሳቦችን መፍጠር።' },
                    { title: 'ሙያዊ ብቃት እና አስተማማኝነት', desc: 'ዝግጅቶችን በከፍተኛ ሙያዊ ብቃት እና አስተማማኝነት በማከናወን መልካም ስም መገንባት።' },
                    { title: 'እድገት እና መስፋፋት', desc: 'የተሳካ ዝግጅቶችን በቋሚነት በማቅረብ የደንበኞችን ቁጥር ማሳደግ።' },
                    { title: 'የኢንዱስትሪ መሪነት', desc: 'በኮርፖሬት ዝግጅት አስተዳደር ዘርፍ አዳዲስ አዝማሚያዎችን በመፍጠር የኢንዱስትሪው መሪ መሆን።' }
                ]
            },
            objectives: {
                title: 'ስልታዊ ዓላማዎች',
                items: [
                    'ለኮርፖሬት ደንበኞች ልዩ ፍላጎት እና መስፈርት የተዘጋጁ አጠቃላይ የዝግጅት እቅድ አገልግሎቶችን ማቅረብ።',
                    'በሁሉም የዝግጅት አስተዳደር ዘርፎች (ቦታ መረጣ፣ ሎጂስቲክስ፣ ምግብ፣ ኦዲዮ-ቪዥዋል እና መዝናኛ) ጥንቃቄ የተሞላበት ትኩረት መስጠት።',
                    'ደንበኞች ካላቸው የምርት መለያ፣ እሴቶች እና ዓላማዎች ጋር የሚጣጣም ዝግጅት እንዲሆን ከደንበኞች ጋር በቅርብ መስራት።',
                    'ተፈላጊውን ታዳሚ ለመሳብ ውጤታማ የግብይት እና የማስተዋወቂያ ስልቶችን መተግበር።',
                    'ሂደቶችን ለማቀላጠፍ፣ ቅልጥፍናን ለመጨመር እና የተሻለ ውጤት ለማምጣት ቴክኖሎጂን እና የዝግጅት አስተዳደር መሳሪያዎችን መጠቀም።',
                    'ከፍተኛ ጥራት ያለው እና አስተማማኝ አገልግሎት ለማግኘት ከአቅራቢዎች ጋር ጠንካራ ግንኙነት መፍጠር።',
                    'በዝግጅት ኢንዱስትሪ ውስጥ ካሉ የቅርብ ጊዜ አዝማሚያዎች እና ፈጠራዎች ጋር በቋሚነት መራመድ።',
                    'የእያንዳንዱን ዝግጅት ስኬት መገምገም፣ አስተያየቶችን መሰብሰብ እና ለወደፊት ዝግጅቶች መሻሻሎችን ማድረግ።'
                ]
            }
        }
    }
};
