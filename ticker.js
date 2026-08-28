// ticker.js - Comprehensive A-to-Z Live Stock Market & Indices Ticker Handler
async function fetchMarketIndices() {
    try {
        const marketData = [
            { symbol: "ADANI ENTERPRISES", price: "3,120.40", change: "+1.25%", isUp: true },
            { symbol: "ADANI PORTS", price: "1,450.80", change: "+0.85%", isUp: true },
            { symbol: "ASIAN PAINTS", price: "2,890.10", change: "-0.40%", isUp: false },
            { symbol: "AXIS BANK", price: "1,180.50", change: "+0.60%", isUp: true },
            { symbol: "BAJAJ FINANCE", price: "7,120.00", change: "+1.40%", isUp: true },
            { symbol: "BAJAJ FINSERV", price: "1,650.30", change: "-0.25%", isUp: false },
            { symbol: "BHARTI AIRTEL", price: "1,540.20", change: "+1.80%", isUp: true },
            { symbol: "BPCL", price: "340.15", change: "-1.10%", isUp: false },
            { symbol: "CIPLA", price: "1,510.90", change: "+0.45%", isUp: true },
            { symbol: "COAL INDIA", price: "480.25", change: "-0.75%", isUp: false },
            { symbol: "DIVIS LAB", price: "4,620.00", change: "+0.90%", isUp: true },
            { symbol: "DR REDDY", price: "6,750.40", change: "+0.30%", isUp: true },
            { symbol: "EICHER MOTORS", price: "4,890.60", change: "+2.10%", isUp: true },
            { symbol: "GRASIM", price: "2,510.30", change: "-0.15%", isUp: false },
            { symbol: "HCL TECH", price: "1,780.20", change: "+1.15%", isUp: true },
            { symbol: "HDFC BANK", price: "1,655.30", change: "+0.65%", isUp: true },
            { symbol: "HDFC LIFE", price: "650.40", change: "-0.50%", isUp: false },
            { symbol: "HERO MOTOCORP", price: "5,420.10", change: "+1.20%", isUp: true },
            { symbol: "HINDALCO", price: "680.50", change: "+2.40%", isUp: true },
            { symbol: "HINDUNILVR", price: "2,430.00", change: "-0.35%", isUp: false },
            { symbol: "ICICI BANK", price: "1,240.80", change: "+0.95%", isUp: true },
            { symbol: "INDUSIND BANK", price: "1,390.20", change: "-1.45%", isUp: false },
            { symbol: "INFY", price: "1,820.40", change: "+1.05%", isUp: true },
            { symbol: "ITC", price: "498.20", change: "-0.20%", isUp: false },
            { symbol: "JSW STEEL", price: "930.10", change: "+0.70%", isUp: true },
            { symbol: "KOTAK BANK", price: "1,740.50", change: "-0.40%", isUp: false },
            { symbol: "L&T", price: "3,650.00", change: "+1.35%", isUp: true },
            { symbol: "M&M", price: "2,840.60", change: "+2.25%", isUp: true },
            { symbol: "MARUTI", price: "12,450.00", change: "+0.55%", isUp: true },
            { symbol: "NTPC", price: "380.40", change: "-0.80%", isUp: false },
            { symbol: "ONGC", price: "290.15", change: "+0.40%", isUp: true },
            { symbol: "POWERGRID", price: "330.20", change: "-0.30%", isUp: false },
            { symbol: "RELIANCE", price: "2,980.50", change: "+1.12%", isUp: true },
            { symbol: "SBILIFE", price: "1,480.00", change: "+0.20%", isUp: true },
            { symbol: "SBI", price: "820.60", change: "+1.50%", isUp: true },
            { symbol: "SUNPHARMA", price: "1,720.30", change: "+0.75%", isUp: true },
            { symbol: "TCS", price: "4,150.00", change: "-0.45%", isUp: false },
            { symbol: "TATA MOTORS", price: "1,050.20", change: "+1.85%", isUp: true },
            { symbol: "TATA STEEL", price: "165.40", change: "-0.90%", isUp: false },
            { symbol: "TECHM", price: "1,560.80", change: "+1.10%", isUp: true },
            { symbol: "TITAN", price: "3,420.00", change: "-0.60%", isUp: false },
            { symbol: "ULTRACEMCO", price: "11,200.50", change: "+0.80%", isUp: true },
            { symbol: "WIPRO", price: "550.30", change: "+0.50%", isUp: true },
            { symbol: "NIFTY 50", price: "24,207.75", change: "-0.52%", isUp: false },
            { symbol: "SENSEX", price: "79,652.10", change: "+0.38%", isUp: true },
            { symbol: "BANK NIFTY", price: "51,430.20", change: "+0.15%", isUp: true }
        ];

        const tickerTrack = document.getElementById('liveTicker');
        if (!tickerTrack) return;

        let htmlContent = '';
        // Loop multiple times to ensure continuous flow across wide screens
        const fullListData = [...marketData, ...marketData, ...marketData];

        fullListData.forEach(item => {
            const arrowColor = item.isUp ? '#10B981' : '#EF4444';
            const arrowSymbol = item.isUp ? '▲' : '▼';
            htmlContent += `
                <div style="display: inline-flex; align-items: center; gap: 8px; color: #F8FAFC; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; padding: 0 20px; white-space: nowrap;">
                    <span style="color: #94A3B8;">${item.symbol}</span>
                    <span style="color: #FFFFFF;">${item.price}</span>
                    <span style="color: ${arrowColor}; font-size: 12px;">${arrowSymbol} ${item.change}</span>
                </div>
            `;
        });

        tickerTrack.innerHTML = htmlContent;
    } catch (error) {
        console.error("Error loading ticker data:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchMarketIndices();
});