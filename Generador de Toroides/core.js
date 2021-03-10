function buildMatrix(row, cols) {
    var array = [];
    for (var i = 0; i < row; i++) {
        var line = [];
        for (var j = 0; j < cols; j++) {
            line.push(false);
        }
        array.push(line);
    }
    return array;
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function printMatrix(t){
    arrText = '';
    for (var i = 0; i < t.length; i++) {
        arrText += '[';
        for (var j = 0; j < t[i].length; j++) {
            if(t[i][j]){
                arrText += ' x ';
            }else{
                arrText += ' o ';
            }
        }
        arrText += ']<br>';
    }
    arrText += '';
    console.log(arrText);
    return arrText;
}

function filas(t){
    return t.length;
}

function columnas(t) {
    var f = 0;
    if (filas(t) > 0) {
        f = t[0].length;
    }
    return f;
}

function filaToroide(f, t) {
    return mod(f, filas(t));
}

function columnaToroide(c, t) {
    return mod(c, columnas(t));
}

function vecinosVivos(t, f, c) {
    var vivos = 0;
    for (var i = f - 1; i <= f + 1; i++) {
        for (var j = c - 1; j <= c + 1; j++) {
            if ((i != f) || (j != c)) {
                var x = filaToroide(i, t);
                var y = columnaToroide(j, t);
                if (t[x][y]) {
                    vivos++;
                }
            }
        }
    }
    return vivos;
}

function debeVivir(t, x, y) {
    var resp = false;
    var cantVivos = vecinosVivos(t, x, y);
    if (t[x][y] && cantVivos >= 2 && cantVivos <= 3) {
        resp = true;
    } else if (!t[x][y] && cantVivos == 3) {
        resp = true;
    }
    return resp;
}

function cantidadVecinosVivos(t, f, c) {
    var resp = vecinosVivos(t, f, c);
    return resp;
}

function evolucionDePosicion(t, x) {
    var resp = debeVivir(t, x.first, x.second);
    return resp;
}

function evolucionToroide(t) {
    const tEvo = buildMatrix(t.length, t[0].length);
    for (var i = 0; i < t.length; i++) {
        for (var j = 0; j < t[i].length; j++) {
            tEvo[i][j] = evolucionDePosicion(t, {
                first: i,
                second: j
            });
        }
    }
    return tEvo;
}

function evolucionMultiple(t, k){
    tEvo = t;
    var i = 1;
    while(i<=k){
        tEvo = evolucionToroide(tEvo);
        i++;
    }
    return tEvo;
}

function fusionarToroides(t1, t2) {
    var tFinal = buildToroide(t1.length, t1[0].length);
    for(var i = 0; i<t1.length; i++){
        for(var j = 0; j<t1[0].length; j++){
            if(t1[i][j] == true && t2[i][j] == true){
                tFinal[i][j] = true;
            }else{
                tFinal[i][j] = false;
            }
        }
    }
    return tFinal;
}