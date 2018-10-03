let filters = {
    toCurrency: (payload) => {
        return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(payload)
    }
}

export default filters