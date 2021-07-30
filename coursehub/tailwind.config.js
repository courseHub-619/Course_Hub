module.exports = {
    purge: ['./pages/**/*.js', './styles/**/*.css'],

    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    theme: {
        extend: {
            backgroundImage: theme => ({
                'bg': "url('https://images.unsplash.com/photo-1584277261846-c6a1672ed979?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGVhY2hlcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60')",

            })
        }
    }
}