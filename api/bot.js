const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { title, price, phone, operator, type } = JSON.parse(req.body);
    
    // আপনার টেলিগ্রাম তথ্য এখানে দিন
    const BOT_TOKEN = 'YOUR_BOT_TOKEN'; 
    const CHAT_ID = 'YOUR_CHAT_ID';

    const message = `
🔔 **নতুন অর্ডার এসেছে!**
━━━━━━━━━━━━━━━━━━
📱 **অপারেটর:** ${operator}
📦 **অফার:** ${title}
💰 **মূল্য:** ${price} টাকা
📞 **নম্বর:** ${phone}
🛠 **টাইপ:** ${type}
━━━━━━━━━━━━━━━━━━
    `;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false });
    }
}
