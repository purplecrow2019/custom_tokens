let data = {
    Letter: {
        trigonometric_function: ['sin', 'cos', 'tan','sec','cosec','cot','csc'],
        inverse_trigonometric_function:['arcsin','arccos','arctan'],
        inverse:['inv'],
        exponential_function: ['exp'],
        logarithmic_function: ['log', 'ln'],
        determinant :['det','Det'],
        integration:['int','inte'],
        limit:['limit','lim'],
        tending:['rarr'],
        degree:['deg'],
        infinity:['oo'],
        root_function:['sqrt'],
        greekLetters: [ 'alpha' ,
                        // 'Alpha' ,
                        'beta' ,
                        // 'Beta',
                        'gamma',
                        // 'Gamma' ,
                        'delta' ,
                        // 'Delta',
                        'epsilon', 
                        // 'Epsilon' ,
                        'varepsilon',
                        'zeta' ,
                        // 'Zeta',
                        'eta' ,
                        // 'Eta',
                        'theta',
                        // 'Theta', 
                        'vartheta', 
                        'iota' ,
                        // 'Iota' ,
                        'kappa' ,
                        // 'Kappa' ,
                        'lambda',
                        // 'Lambda',
                        'mu' ,
                        // 'Mu' ,
                        'nu' ,
                        // 'Nu' ,
                        'xi' ,
                        // 'Xi' ,
                        'omicron',
                        // 'Omicron',
                        'pi',
                        // 'Pi',
                        'rho',
                        // 'Rho',
                        'sigma',
                        // 'Sigma',
                        'tau',
                        // 'Tau' ,
                        'upsilon' ,
                        // 'Upsilon',
                        'phi',
                        // 'Phi' ,
                        'varphi',
                        'chi' ,
                        // 'Chi' ,
                        'psi' ,
                        // 'Psi',
                        'omega' ,
                        // 'Omega' ,
                    ],
    differential_element : ['dx','dy','dz'],
    variable: ['x','y','z','m','n','p','q','r','s','t','u','v','w','a','b','c','d']
    },
    specialCharacters:{
        degree: ['^@','@'] 
    },
    Operator:{
        power :['^'],
        sum :['+'],
        mod: ['|'],
        divide:['/'],
        underscore:['_'],
        diff:['-'],
        equal:['='],
        geq:['>=','>'],
        leq:['<=','<']
    }
}


module.exports = {data};   