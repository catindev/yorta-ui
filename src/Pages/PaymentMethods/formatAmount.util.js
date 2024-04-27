export default function formatAmount(amount) {
    let fixed = amount / 100;
    if (fixed % 1 === 0) {
        return fixed.toString();
    } else {
        return fixed.toFixed(2); 
    }
}