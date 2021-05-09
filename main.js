document.getElementById('menu1').addEventListener('click', openmenu1);
document.getElementById('menu2').addEventListener('click', openmenu2);

function openmenu1() {
    document.getElementById('dd1').classList.toggle('active')
    if (document.getElementById('dd2').className == 'dropdown active') {
        document.getElementById('dd2').classList.toggle('active');
    }
}

function openmenu2() {
    document.getElementById('dd2').classList.toggle('active')
    if (document.getElementById('dd1').className == 'dropdown active') {
        document.getElementById('dd1').classList.toggle('active');
    }
}

let two_thumb1 = document.getElementById('two_thumb1');
let two_thumb2 = document.getElementById('two_thumb2');
let two_thumb3 = document.getElementById('two_thumb3');
let two_thumb4 = document.getElementById('two_thumb4');

noUiSlider.create(two_thumb1, {
    start: [0],
    connect: false,
    step: 0.01,
    range: {
        'min': -5,
        'max': 5
    }
});

noUiSlider.create(two_thumb2, {
    start: [1],
    connect: false,
    step: 0.01,
    range: {
        'min': 0.1,
        'max': 5
    }
});

noUiSlider.create(two_thumb3, {
    start: [0],
    connect: false,
    step:0.01,
    range: {
        'min': -5,
        'max': 5
    }
});

noUiSlider.create(two_thumb4, {
    start: [-2,2],
    connect: true,
    step: 0.01,
    range: {
        'min': -5,
        'max': 5
    }
});


let dummy = 0;
let interval = 0.01;
let step = false;
let output1 = document.getElementById('output1');
output1.innerHTML = '&#956 = ' + two_thumb1.noUiSlider.get()
let par1 = parseFloat(two_thumb1.noUiSlider.get())

let output2 = document.getElementById('output2');
output2.innerHTML = '&#963 = ' + two_thumb2.noUiSlider.get()
let par2 = parseFloat(two_thumb2.noUiSlider.get())

let output3 = document.getElementById('output3');
output3.innerHTML = '# = ' + two_thumb3.noUiSlider.get()
let par3 = parseFloat(two_thumb3.noUiSlider.get())

let output4 = document.getElementById('output4');
output4.innerHTML = '(#, #) = ' + '( ' + two_thumb4.noUiSlider.get()[0] + ', ' + two_thumb4.noUiSlider.get()[1] + ')'
let par4 = parseFloat(two_thumb4.noUiSlider.get())

let list_of_par = [par1, par2, par3, par4]
let list_of_symb = ['&#956', '&#963', '#', ['#', '#']]
let page = 'Norm'

arr = []
for (let i=-5; i<=5; i += 0.01) {
    arr.push(Math.round(100*i) / 100);
}

arr2 = []
for (let i=0; i < arr.length; i++) {
    arr2.push(dist_func(arr[i], list_of_par, page))
}

let drr2 = []
let empty = []

let DistChart = new Chart (mychart, {
    type: 'line',
    data: {
        labels: arr,
        datasets: [{
            data: empty,
            backgroundColor: 'rgba(24,114,216, 0.2)',
            borderColor: 'rgba(0,142,255,0)',
            borderWidth: 6,
            steppedLine: false
        }, {
            data: drr2,
            borderColor: 'rgba(0,142,255,1)',
            backgroundColor: 'rgba(24,114,216, 0)',
            borderWidth: 6,
            steppedLine: false
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 1
                }
            }],
            xAxes: [{
                ticks: {
                    autoSkip: false,
                    callback: function (value, index, values) {
                        if (Number.isInteger(value)) {
                            return value;
                        }
                    }
                }
            }],
        },
        tooltips: {
            enabled: false
        },
        maintainAspectRatio: false,
        animation: false,
        elements: {
            point: {
                radius: 0
            }
        },
        legend: false
        },
    
})

two_thumb1.noUiSlider.on('slide', function() {
    output1.innerHTML = list_of_symb[0] + ' = '  + two_thumb1.noUiSlider.get()
    list_of_par[0] = parseFloat(two_thumb1.noUiSlider.get())
    let MV = mean_var_calc(list_of_par, page)
    if (typeof(MV[0]) == 'number') {
        MV[0] = MV[0].toFixed(2)
    }
    if (typeof(MV[1]) == 'number') {
        MV[1] = MV[1].toFixed(2)
    }

    if (page == 'Binom') {
        arr = [];
        for (let i=0; i <= parseFloat(two_thumb1.noUiSlider.get()) + 1; i++) {
            arr.push(i)
        }
        DistChart.data.labels = arr;
    }
    arr2 = []
    for (let i=0; i < arr.length; i++) {
        arr2.push(dist_func(arr[i], list_of_par, page))
    }
    DistChart.data.datasets[0].data = arr2
    Expect.innerHTML = 'E[X] = ' + MV[0]
    Var.innerHTML = 'Var(X) = ' + MV[1]

    DistChart.update()
})

two_thumb2.noUiSlider.on('slide', function () {
    output2.innerHTML = list_of_symb[1] + ' = '  + two_thumb2.noUiSlider.get()
    list_of_par[1] = parseFloat(two_thumb2.noUiSlider.get())
    let MV = mean_var_calc(list_of_par, page)
    if (typeof(MV[0]) == 'number') {
        MV[0] = MV[0].toFixed(2)
    }
    if (typeof(MV[1]) == 'number') {
        MV[1] = MV[1].toFixed(2)
    }

    arr2 = []
    for (let i = 0; i<arr.length; i++) {
        arr2.push(dist_func(arr[i], list_of_par, page))
    }
    DistChart.data.datasets[0].data = arr2;
    Expect.innerHTML = 'E[X] = ' + MV[0]
    Var.innerHTML = 'Var(X) = ' + MV[1]

    DistChart.update()
})

two_thumb3.noUiSlider.on('slide', function () {
    output3.innerHTML = list_of_symb[2] + ' = '  + two_thumb3.noUiSlider.get()
    list_of_par[2] = parseFloat(two_thumb3.noUiSlider.get())
    let MV = mean_var_calc(list_of_par, page)
    if (typeof(MV[0]) == 'number') {
        MV[0] = MV[0].toFixed(2)
    }
    if (typeof(MV[1]) == 'number') {
        MV[1] = MV[1].toFixed(2)
    }

    arr2 = []
    for (let i = 0; i<arr.length; i++) {
        arr2.push(dist_func(arr[i], list_of_par, page))
    }
    DistChart.data.datasets[0].data = arr2;
    Expect.innerHTML = 'E[X] = ' + MV[0]
    Var.innerHTML = 'Var(X) = ' + MV[1]

    DistChart.update()
})

two_thumb4.noUiSlider.on('slide', function () {
    output4.innerHTML = list_of_symb[3] + '= ( '  + two_thumb4.noUiSlider.get()[0] + ', ' + two_thumb4.noUiSlider.get()[1] + ')';
    list_of_par[3] = [parseFloat(two_thumb4.noUiSlider.get()[0]), parseFloat(two_thumb4.noUiSlider.get()[1])];
    let MV = mean_var_calc(list_of_par, page)
    if (typeof(MV[0]) == 'number') {
        MV[0] = MV[0].toFixed(2)
    }
    if (typeof(MV[1]) == 'number') {
        MV[1] = MV[1].toFixed(2)
    }

    arr2 = []
    for (let i = 0; i<arr.length; i++) {
        arr2.push(dist_func(arr[i], list_of_par, page))
    }
    DistChart.data.datasets[0].data = arr2;
    Expect.innerHTML = 'E[X] = ' + MV[0]
    Var.innerHTML = 'Var(X) = ' + MV[1]

    DistChart.update()
})

function dist_func (x, par, what_page) {
    if (what_page === 'Norm') {
        return 1 / (par[1] * Math.sqrt(2 * Math.PI)) * Math.exp(-(1/2) * Math.pow((x - par[0]) / par[1], 2));
    } else if (what_page === 'Exp') {
        return par[0] * Math.exp(-par[0] * x);
    } else if (what_page == 'Log-Norm') {
        return 1 / (x * par[1] * Math.sqrt(2 * Math.PI)) * Math.exp(-1/2 * Math.pow((Math.log(x) - par[0]) / par[1], 2))
    } else if (what_page == 'Uni') {
        if (par[3][0] == par[3]) {
            return 0
        } else if ((x >= par[3][0]) && (x <= par[3][1])) {
            return 1 / (par[3][1] - par[3][0])
        } else {
            return 0
        }
    } else if (what_page == 'Binom') {
        if (x <= par[0]) {
            return math.combinations(par[0], x) * Math.pow((par[1]), x) * Math.pow(1 - par[1], par[0]-x);
        } else {
            return 0;
        }
    } else if (what_page == 'Geom') {
        return par[0] * math.pow((1 - par[0]), x-1)
    } else if (what_page == 'Poisson') {
        return math.exp(-par[0]) * math.pow(par[0], x) / math.factorial(x)
    } else if (what_page == 'Hyper') {
        if (x > par[2]) {
            return 0
        } else if (x < math.max(par[2] + par[1] - par[0],0)) {
            return 0
        } else if (x > Math.min(par[1], par[2])) {
            return 0
        } else {
            return math.combinations(par[1], x) * math.combinations(par[0] - par[1], par[2] - x) / math.combinations(par[0], par[2])
        }    
    } else if (what_page == 'NegBinom') {
        if (x >= par[0]) {
            return math.combinations(x-1, par[0]-1) * math.pow(par[1],par[0]) * math.pow(1-par[1], x - par[0])
        } else {
            return 0;
        }
    } else if (what_page == 'Gamma') {
        return math.pow(par[1], par[0]) * math.pow(x, par[0] - 1) * math.exp(-par[1] * x) / math.gamma(par[0])
    } else if (what_page == 'Beta') {
        return math.gamma(par[0] + par[1]) / (math.gamma(par[0]) * math.gamma(par[1])) * math.pow(x, par[0] - 1) * math.pow(1-x, par[1]-1)
    }
}

function mean_var_calc(par, what_page) {
    if (what_page == 'Norm') {
        return [
            par[0], 
            math.pow(par[1],2)
        ]
    } else if (what_page == 'Exp') {
        return [
            1 / par[0],
            1 / math.pow(par[0],2)
        ]
    } else if (what_page == 'Log-Norm') {
        return [
            math.exp(par[0] + 1/2 * par[1]), 
            math.exp(2*par[0] + par[1]) * (math.exp(par[1]) - 1)
        ]
    } else if (what_page == 'Uni') {
        if (par[3][0] != par[3][1]) {
            return [
                (par[3][1] + par[3][0]) / 2,
                math.pow(par[3][1] - par[3][0],2) / 12
            ]
        } else {
            return ['Undef', 'Undef']
        }
    } else if (what_page == 'Binom') {
        return [
            par[0] * par[1], 
            par[0] * par[1] * (1 - par[1])
        ]
    } else if (what_page == 'Geom') {
        return [
            1 / par[0],
            (1 - par[0]) / math.pow(par[0], 2)
        ]
    } else if (what_page == 'Poisson') {
        return [
            par[0],
            par[0]
        ]
    } else if (what_page == 'Hyper') {
        if (Math.min(par[1], par[2]) < math.max(par[2] + par[1] - par[0],0)) {
            return ['Undef', 'Undef']
        } else {
            return [par[2]*par[1]/par[0], (par[2]*par[1]/par[0])*((par[0]-par[1])/par[0])*(par[0]-par[2])/(par[0]-1) ]
        } 
    } else if (what_page == 'NegBinom') {
        return [par[0]/par[1], par[0]*(1-par[1])/math.pow(par[1],2)]
    } else if (what_page == 'Gamma') {
        return [par[0]/par[1], par[0]/math.pow(par[1],2)]
    } else if (what_page == 'Beta') {
        return [par[0]/(par[0]+par[1]), (par[0]*par[1])/(math.pow(par[0]+par[1],2)*(par[0]+par[1]+1))]
    }
}

animate_pop()

function hide_or_show(pars) {
    if (pars[0] != '#') {
        document.getElementById('p1').style.display = 'block'
    } else {
        document.getElementById('p1').style.display = 'none'
    }

    if (pars[1] != '#') {
        document.getElementById('p2').style.display = 'block'
    } else {
        document.getElementById('p2').style.display = 'none'
    }

    if (pars[2] != '#') {
        document.getElementById('p3').style.display = 'block'
    } else {
        document.getElementById('p3').style.display = 'none'
    }

    if (pars[3] != '( #, #)') {
        document.getElementById('p4').style.display = 'block'
    } else {
        document.getElementById('p4').style.display = 'none'
    }
}

function info(what_page) {
    if (what_page == 'Norm') {
        return ['Normal Distribution', 'X \\sim N(\\mu, \\sigma^2)', 'f(x) = \\frac{ 1 }{ \\sigma \\sqrt{ 2 \\pi }} e^{-\\frac{1}{2}\\left[ \\frac{x - \\mu}{\\sigma}\\right]^2}', '-\\infty < x < \\infty']
    } else if (what_page == 'Exp') {
        return ['Exponential Distribution', 'X \\sim Exp( \\lambda )', 'f(x) = \\lambda e^{-\\lambda x}', '0 < x < \\infty']
    } else if (what_page == 'Log-Norm') {
        return ['Log-Normal Distribution', 'X \\sim LN( \\mu, \\sigma^2)', 'f(x) = \\frac{ 1 }{x \\sigma \\sqrt{ 2 \\pi }} e^{-\\frac{1}{2}\\left[ \\frac{\ln{x} - \\mu}{\\sigma}\\right]^2}', '0 < x < \\infty']
    } else if (what_page == 'Uni') {
        return ['Uniform Distribution', 'X \\sim U( a, b)', 'f(x) = \\frac{1}{b - a}', 'a < x < b']
    } else if (what_page == 'Binom') {
        return ['Binomial Distribution', 'X \\sim Binom( n, p)', 'P(X = x) = {n \\choose x} p^x (1-p)^{n-x}', 'x = 0, 1, 2, ..., n']
    } else if (what_page == 'Geom') {
        return ['Geometric Distribution', 'X \\sim Geom( p )', 'P(X = x) = p(1-p)^{x-1}', 'x = 1, 2, ,3, ...']
    } else if (what_page == 'Poisson') {
        return ['Poisson Distribution', 'X \\sim Possion( \\lambda )', 'P(X = x) = \\frac{e^{-\\lambda}(\\lambda)^x}{x!}', 'x = 0, 1, 2, 3, ...']
    } else if (what_page == 'Hyper') {
        return ['Hypergeometric Distribution', 'X \\sim HyperGeom( N, K, n)', 'P(X = x) = \\frac{{K \\choose x}{N - K \\choose n-x}}{{N \\choose n}}', 'x \\in [max(0, n + K - N), ..., min(n, K)]']
    } else if (what_page == 'NegBinom') {
        return ['Negative Binomial Distribution', 'X \\sim NB( k, p)', 'P(X = x) = {x - 1 \\choose x - k} p^k (1-p)^{x - k}', 'x = k, k + 1, k + 2, ...']
    } else if (what_page == 'Gamma') {
        return ['Gamma Distribution', 'X \\sim Gamma( \\alpha, \\beta)', ' f(x) = \\frac{x^{\\alpha - 1} e^{-\\frac{x}{\\beta}}}{\\Gamma(\\alpha) \\beta^{\\alpha}} ', '0 < x < \\infty']
    } else if (what_page == 'Beta') {
        return ['Beta Distribution', 'X \\sim Beta( \\alpha, \\beta)', 'f(x) = \\frac{\\Gamma(\\alpha + \\beta)}{\\Gamma(\\alpha)\\Gamma(\\beta)} x^{\\alpha - 1}(1-x)^{\\beta - 1}', '0 < x < 1']
    }  
}

function symbol_grab(what_page) {
    if (what_page == 'Norm') {
        return ['&#956', '&#963', '#', '( #, #)']
    } else if (what_page == 'Exp') {
        return ['&#955', '#', '#', '( #, #)']
    } else if (what_page == 'Log-Norm') {
        return ['&#956', '&#963', '#', '( #, #)']
    } else if (what_page == 'Uni') {
        return ['#', '#', '#', '( a, b)']
    } else if (what_page == 'Binom') {
        return ['n', 'p', '#', '( #, #)']
    } else if (what_page == 'Geom') {
        return ['p', '#', '#', '( #, #)']
    } else if (what_page == 'Poisson') {
        return ['&#955', '#', '#', '( #, #)']
    } else if (what_page == 'Hyper') {
        return ['N', 'K', 'n', '( #, #)']
    } else if (what_page == 'NegBinom') {
        return ['k', 'p', '#', '( #, #)']
    } else if (what_page == 'Gamma') {
        return ['&#945', '&#955', '#', '( #, #)']
    } else if (what_page == 'Beta') {
        return ['&#945', '&#946', '#', '( #, #)']
    }  
}

function par_range_grab(what_page) {
    if (what_page == 'Norm') {
        return [[-5,5,0], [0.1, 5, 1]]
    } else if (what_page == 'Exp') {
        return [[0,5,1]]
    } else if (what_page == 'Log-Norm') {
        return [[-5,5,0], [0.1, 5, 0.5]]
    } else if (what_page == 'Uni') {
        return [[-5,5, -1, 1]]
    } else if (what_page == 'Binom') {
        return [[0,40, 10], [0, 1, 0.5]]
    } else if (what_page == 'Geom') {
        return [[0, 1, 0.5]]
    } else if (what_page == 'Poisson') {
        return [[0, 30, 0.7]]
    } else if (what_page == 'Hyper') {
        return [[0,50, 50], [0, 50, 40], [0, 50, 30]]
    } else if (what_page == 'NegBinom') {
        return [[1,30, 1], [0, 1, 0.5]]
    } else if (what_page == 'Gamma') {
        return [[0.01, 30, 1], [0.01, 10, 1]]
    } else if (what_page == 'Beta') {
        return [[0.01, 10, 2], [0.01, 10, 2]]
    }  
}

function range(what_page) {
    if (what_page == 'Norm') {
        return [[-5,5], [0, 1]]
    } else if (what_page == 'Exp') {
        return [[0,6],[0,2]]
    } else if (what_page == 'Log-Norm') {
        return [[0,6],[0,2]]
    } else if (what_page == 'Uni') {
        return [[-5,5], [0, 1]]
    } else if (what_page == 'Binom') {
        return [[0,11], [0,0.6]]
    } else if (what_page == 'Geom') {
        return [[1, 15], [0, 0.5]]
    } else if (what_page == 'Poisson') {
        return [[0, 20], [0,0.5]]
    } else if (what_page == 'Hyper') {
        return [[0, 50], [0,0.5]]
    } else if (what_page == 'NegBinom') {
        return [[1,60], [0,0.5]]
    } else if (what_page == 'Gamma') {
        return [[0.01,10], [0,2]]
    } else if (what_page == 'Beta') {
        return [[0,1], [0,4]]
    }  
}

function get_step(what_page) {
    if (what_page == 'Norm') {
        return false
    } else if (what_page == 'Exp') {
        return false
    } else if (what_page == 'Log-Norm') {
        return false
    } else if (what_page == 'Uni') {
        return true
    } else if (what_page == 'Binom') {
        return true
    } else if (what_page == 'Geom') {
        return true
    } else if (what_page == 'Poisson') {
        return true
    } else if (what_page == 'Hyper') {
        return true
    } else if (what_page == 'NegBinom') {
        return true
    } else if (what_page == 'Gamma') {
        return false
    } else if (what_page == 'Beta') {
        return false
    }  
}

function discrete(what_page) {
    if (what_page == 'Norm') {
        return false
    } else if (what_page == 'Exp') {
        return false
    } else if (what_page == 'Log-Norm') {
        return false
    } else if (what_page == 'Uni') {
        return false
    } else if (what_page == 'Gamma') {
        return false
    } else if (what_page == 'Beta') {
        return false
    } else {
        return true
    }
}

function animate_pop() {
    let i = -10;
    let id = setInterval(frame1, 10)
    function frame1() {
        if (i > 100) {
            clearInterval(id)
            if (step == false) {
                animate_line()
            } else {
                dummy = 0;
            }
            
        } else {
            let crr = []
            for (let j = 0; j < arr2.length; j++) {
                crr[j] = arr2[j] / (50 * Math.exp(-i/8) + 1)
            }
            DistChart.data.datasets[0].data = crr;

            if (step == true) {
                DistChart.data.datasets[0].borderColor = 'rgba(0, 142, 255,' + ((i+10)/110) + ')'
            }
            DistChart.update()
            i++;
        }
    }
    

}

function animate_depop(what_page) {
    let i = 100;
    let id = setInterval(frame1, 10)
    function frame1() {
        if (i < -10) {
            clearInterval(id)
            change_page(what_page, info(what_page), symbol_grab(what_page), par_range_grab(what_page), range(what_page))
        } else {
            let crr = []
            for (let j = 0; j < arr2.length; j++) {
                crr[j] = arr2[j] / (50 * Math.exp(-i/8) + 1)
            }
            DistChart.data.datasets[0].data = crr;
            DistChart.data.datasets[0].borderColor = 'rgba(0, 142, 255,' + ((i+10)/110) + ')'
            DistChart.update()
            i--;
        }
    }
    

}

function animate_line() {
    let i = 0;
    let id = setInterval(frame2, 10)
    function frame2() {
        if (i > arr.length) {
            clearInterval(id)
            DistChart.data.datasets[0].borderColor = 'rgba(0,142,255,1)'
            DistChart.data.datasets[1].data = [];
            drr2 = [];
            dummy = 0;
        } else {
            let drr2 = []
            for (let k = 0; k <= i; k++) {
                drr2.push({x : arr[k], y: arr2[k]})
            }
            DistChart.data.datasets[1].data = drr2;
            DistChart.update()
            i += Math.round(arr.length / 90);
        }
        
    }    
}

function animate_drift() {
    let i = 0.1;
    let id = setInterval(frame3, 10)
    function frame3() {
        if (i > 500) {
            clearInterval(id)

        } else {
            document.getElementById('right-box').style.transform = 'translate(' + i + 'px,0px)'
            document.getElementById('bottom-row').style.transform = 'translate(0px,' + i + 'px)'
            u = 1 - i/500

            document.getElementById('right-box').style.opacity = u
            document.getElementById('bottom-row').style.opacity = u
            i += Math.pow(5*i, 1/3)
        }
    }
}

function animate_dedrift() {
    let i = 506.5
    let id = setInterval(frame4, 10)
    function frame4() {    
        if (i < 0) {
            clearInterval(id)
            document.getElementById('bottom-row').style.transform = 'translate(0px,0px)'
            document.getElementById('right-box').style.transform = 'translate(0px,0px)'
            document.getElementById('right-box').style.opacity = 1
            document.getElementById('bottom-row').style.opacity = 1
        } else {
            document.getElementById('right-box').style.transform = 'translate(' + i + 'px,0px)'
            document.getElementById('bottom-row').style.transform = 'translate(0px,' + i + 'px)'
            u = 1 - i/500

            document.getElementById('right-box').style.opacity = u
            document.getElementById('bottom-row').style.opacity = u
            i -= Math.pow(5*i, 1/3)
        }
    }
}

function animate_change_page(what_page) {
    if (dummy == 0) {
        dummy = 1;
        animate_depop(what_page)
        animate_drift()
    }
    return
}

/*Changing pages*/

function change_page(what_page, page_content, symb, range_par, range) {
    step = get_step(what_page)
    page = what_page
    document.getElementById('title').innerHTML = page_content[0]
    document.getElementById('equation').innerHTML = 'PDF: $${' + page_content[2] + '}$$'
    document.getElementById('distributed').innerHTML = '$${' + page_content[1] + '}$$'
    document.getElementById('lim').innerHTML = '$${' + page_content[3] + '}$$'
    if (discrete(what_page)) {
        interval = 1;
        DistChart.data.datasets[0].steppedLine = true;
    } else if (what_page == 'Beta') {
        interval = 0.001;
        DistChart.data.datasets[0].steppedLine = false; 
    } else {
        interval = 0.01;
        DistChart.data.datasets[0].steppedLine = false; 
    }

    if (what_page == 'Binom' || what_page == 'NegBinom') {
        two_thumb1.noUiSlider.updateOptions({
            step: 1
        })
        two_thumb2.noUiSlider.updateOptions({
            step: 0.01
        })
    } else if (what_page == 'Hyper') {
        two_thumb1.noUiSlider.updateOptions({
            step: 1
        })
        two_thumb2.noUiSlider.updateOptions({
            step: 1
        })
        two_thumb3.noUiSlider.updateOptions({
            step: 1
        })
    } else {
        two_thumb1.noUiSlider.updateOptions({
            step: 0.01
        })
        two_thumb2.noUiSlider.updateOptions({
            step: 0.01
        })
        two_thumb3.noUiSlider.updateOptions({
            step: 0.01
        })
        two_thumb4.noUiSlider.updateOptions({
            step: 0.01
        })
    }
    let k = 0;
    for (let i = 0; i < symb.length; i++) {
        if (symb[i] != '#' & symb[i] != '( #, #)') {
            if (i == 0) {
                two_thumb1.noUiSlider.updateOptions({
                    range: {
                        'min': range_par[k][0],
                        'max': range_par[k][1]
                    }
                })
                two_thumb1.noUiSlider.set(range_par[k][2])
                k++;
            }
            if (i == 1) {
                two_thumb2.noUiSlider.updateOptions({
                    range: {
                        'min': range_par[k][0],
                        'max': range_par[k][1]
                    }
                })
                two_thumb2.noUiSlider.set(range_par[k][2])
                k++;
            }
            if (i == 2) {
                two_thumb3.noUiSlider.updateOptions({
                    range: {
                        'min': range_par[k][0],
                        'max': range_par[k][1]
                    }
                })
                two_thumb3.noUiSlider.set(range_par[k][2])
                k++;
            }
            if (i == 3) {
                two_thumb4.noUiSlider.updateOptions({
                    range: {
                        'min': range_par[k][0],
                        'max': range_par[k][1]
                    }
                })
                two_thumb4.noUiSlider.set([range_par[k][2], range_par[k][3]])
                k++;
            }
        }
    }

    output1.innerHTML = symb[0] + ' = ' + two_thumb1.noUiSlider.get()
    output2.innerHTML = symb[1] + ' = ' + two_thumb2.noUiSlider.get()
    output3.innerHTML = symb[2] + ' = ' + two_thumb3.noUiSlider.get()
    output4.innerHTML = symb[3] + ' = ' + '( ' + two_thumb4.noUiSlider.get()[0] + ', ' + two_thumb4.noUiSlider.get()[1] + ')'
    document.getElementById('par_name1').innerHTML = symb[0] + ':'
    document.getElementById('par_name2').innerHTML = symb[1] + ':'
    document.getElementById('par_name3').innerHTML = symb[2] + ':'
    document.getElementById('par_name4').innerHTML = symb[3] + ':'
    list_of_par = [parseFloat(two_thumb1.noUiSlider.get())
        , parseFloat(two_thumb2.noUiSlider.get())
        , parseFloat(two_thumb3.noUiSlider.get())
        , [parseFloat(two_thumb4.noUiSlider.get()[0]), parseFloat(two_thumb4.noUiSlider.get()[1])]]
    list_of_symb = symb
    hide_or_show(symb)

    let MV = mean_var_calc(list_of_par, page)
    if (typeof(MV[0]) == 'number') {
        MV[0] = MV[0].toFixed(2)
    }
    if (typeof(MV[1]) == 'number') {
        MV[1] = MV[1].toFixed(2)
    }

    Expect.innerHTML = 'E[X] = ' + MV[0]
    Var.innerHTML = 'Var(X) = ' + MV[1]

    arr = []
    for (let i=range[0][0]; i<=range[0][1]; i += interval) {
        arr.push(Math.round((1/interval)*i) / (1/interval));
    }

    arr2 = []
    for (let i=0; i < arr.length; i++) {
        arr2.push(dist_func(arr[i], list_of_par, page))
    }

    DistChart.data.labels = arr;
    DistChart.options.scales.yAxes[0].ticks.min = range[1][0];
    DistChart.options.scales.yAxes[0].ticks.max = range[1][1];
    MathJax.typeset()
   animate_dedrift()
    animate_pop()
}

document.getElementById('Exp').addEventListener('click', function changt_to_exp() {
    animate_change_page('Exp')
});
document.getElementById('Norm').addEventListener('click', function changt_to_norm() {
    animate_change_page('Norm')
});
document.getElementById('Log-Norm').addEventListener('click', function changt_to_LN() {
    animate_change_page('Log-Norm')
});
document.getElementById('Uni').addEventListener('click', function changt_to_Uni() {
    animate_change_page('Uni')
});
document.getElementById('Binom').addEventListener('click', function changt_to_Binom() {
    animate_change_page('Binom')
});
document.getElementById('Geom').addEventListener('click', function changt_to_Geom() {
    animate_change_page('Geom')
});
document.getElementById('Poisson').addEventListener('click', function changt_to_Poisson() {
    animate_change_page('Poisson')
});
document.getElementById('Hyper').addEventListener('click', function changt_to_Hyper() {
    animate_change_page('Hyper')
});
document.getElementById('NegBinom').addEventListener('click', function changt_to_NB() {
    animate_change_page('NegBinom')
});
document.getElementById('Gamma').addEventListener('click', function changt_to_Gamma() {
    animate_change_page('Gamma')
});
document.getElementById('Beta').addEventListener('click', function changt_to_Beta() {
    animate_change_page('Beta')
});