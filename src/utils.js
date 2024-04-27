export const formatAmount = value => (value / 100).toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    .replace(/\.00$/, '');