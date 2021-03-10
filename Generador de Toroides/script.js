function buildTests(name, quantity) {

    var action = document.getElementById("whatShouldIDo").value;
    switch (action) {
        case "1":
            doEvos(name, quantity);
            break;
        case "2":
            doKEvos(name, quantity);
            break;
        case "3":
            doKToroidal(name, quantity);
            break;
        case "4":
            doBipedToroidal(name, quantity);
            break;
        default:
            document.getElementById("TEST_GENERATOR").innerHTML =
                `
            <div class="ditto">
                <img src="./assets/ditto.gif" alt="Ditto">
                <audio id="ditto_audio">
                    <source src="./assets/conga.mp3" type="audio/mp3" start>
                    Your browser does not support the audio element.
                </audio> 
            </div>
            `;
            document.getElementById("ditto_audio").play();
    }
}

function buildToroide(sizeX, sizeY) {
    var cols;
    var rows;
    if (!sizeX && !sizeY) {
        cols = Math.floor((Math.random() * 6) + 3);
        rows = Math.floor((Math.random() * 6) + 3);
    } else {
        cols = sizeX;
        rows = sizeY;
    }
    var matrix = buildMatrix(cols, rows);
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            var deadOrAlive = Math.round(Math.random());
            if (deadOrAlive == 1) {
                matrix[i][j] = true;
            }
        }
    }
    return matrix;
}

function convertToText(matriz) {
    var texto = JSON.stringify(matriz);
    var textoReplace = texto.replaceAll("[", "{");
    var lastTexto = textoReplace.replaceAll("]", "}");
    return lastTexto;
}

function doEvos(name, quantity) {
    var text = '';
    for (var i = 0; i < quantity; i++) {
        var matrixTest = buildToroide();
        var evoMatrixTest = evolucionToroide(matrixTest);

        var matrixText = convertToText(matrixTest);
        var evoMatrixText = convertToText(evoMatrixTest);

        var printedMatrix = printMatrix(matrixTest);
        var printedTestMatrix = printMatrix(evoMatrixTest);
        

        text += `
        <article class="col">
            <article class="row">
                <code class="code_test">
                    TEST(evolucionToroideTEST, ${name}_${i}){
                        <br>
                        toroide t = ${matrixText};
                        <br>
                        <br>
                        toroide evo_t = ${evoMatrixText};
                        <br>
                        <br>
                        evolucionToroide(t);
                        <br>
                        <br>
                        EXPECT_EQ(t, evo_t);
                        <br>
                    }
                </code>
                <section class="graphic_test">
                    <article>
                        <span>Toroide<span>
                        <br>
                        <code>
                            ${printedMatrix}
                        </code>
                    </article>
                    <article>
                        <span>Test Result<span>
                        <br>
                        <code>
                            ${printedTestMatrix}
                        </code>
                    </article>
                </section>
            </article>
            </article>
        `;
    }
    document.getElementById("TEST_GENERATOR").innerHTML = text;
}

function doKEvos(name, quantity) {

    var k = Math.floor((Math.random() * 50) + 0);

    var text = '';
    for (var i = 0; i < quantity; i++) {

        var matrixTest = buildToroide();
        var evoMatrixTest = evolucionMultiple(matrixTest, k);

        var matrixText = convertToText(matrixTest);
        var evoMatrixText = convertToText(evoMatrixTest);

        var printedMatrix = printMatrix(matrixTest);
        var printedTestMatrix = printMatrix(evoMatrixTest);

        text += `
            <article class="col">
                <div class="row">
                    <code class="code_test">
                        TEST(evolucionMultipleTEST, ${name}_${i}){
                            <br>
                            toroide t = ${matrixText};
                            <br>
                            <br>
                            toroide evo_t = ${evoMatrixText};
                            <br>
                            <br>
                            toroide res = evolucionMultiple(t, ${k});
                            <br>
                            <br>
                            EXPECT_EQ(res, evo_t);
                            <br>
                        }
                    </code>
                    <section class="graphic_test">
                        <article>
                            <span>Toroide<span>
                            <br>
                            <code>
                                ${printedMatrix}
                            </code>
                        </article>
                        <article>
                            <span>Test Result<span>
                            <br>
                            <code>
                                ${printedTestMatrix}
                            </code>
                        </article>
                    </section>
                </div>
            </section>
        </article>
        `;
    }
    document.getElementById("TEST_GENERATOR").innerHTML = text;

}

function doKToroidal(name, quantity) {

    var text = `
    <article class="col">
        <div class="row">
        <code class="code_test">
        TEST(seleccionNaturalTEST, ${name}_multiple){<br>vector ts;<br>`;

    for (var i = 0; i < quantity; i++) {

        var matrixTest = buildToroide();
        var matrixText = convertToText(matrixTest);
        text += `
            toroide t_${i} = <br> ${matrixText};
            <br>
            <br>
        `;
    }

    for (var i = 0; i < quantity; i++) {
        text += `ts.push_back(t_${i});
        <br>`;
    }

    text += `
            <br>
            int res = seleccionNatural(ts);
            <br>
            EXPECT_EQ(res, 1); // menos 1
            <br>
        }
    </code>
    <section class="graphic_test">

    </section>
    </div>
    </section>
    </article>
    `;

    document.getElementById("TEST_GENERATOR").innerHTML = text;
}

function doBipedToroidal(name, quantity) {
    var text = '';
    for (var i = 0; i < quantity; i++) {

        var sizeX = Math.floor((Math.random() * 6) + 3);
        var sizeY = Math.floor((Math.random() * 6) + 3);

        var matrixOne = buildToroide(sizeX, sizeY);
        var matrixTwo = buildToroide(sizeX, sizeY);

        var matrixOneText = convertToText(matrixOne);
        var matrixTwoText = convertToText(matrixTwo);

        var fusion = fusionarToroides(matrixOne, matrixTwo);
        var fusionText = convertToText(fusion);

        var printMatrixOne =  printMatrix(matrixOne);
        var printMatrixTwo =  printMatrix(matrixTwo);
        var printMatrixFusion =  printMatrix(fusion);

        text += `
        <article class="col">
            <article class="row">
                <code class="code_test">
                    TEST(fusionarTEST, ${name}_${i}){
                        <br>
                        toroide t1 = ${matrixOneText};
                        <br>
                        <br>
                        toroide t2 = ${matrixTwoText};
                        <br>
                        toroide tout = ${fusionText};
                        <br>
                        <br>
                        toroide res = fusionar(t1, t2);
                        <br>
                        <br>
                        EXPECT_EQ(res, tout);
                    }
                </code>
                <section class="graphic_test">
                    <article>
                        <span>Toroidal 1<span>
                        <br>
                        <code>
                            ${printMatrixOne}
                        </code>
                    </article>
                    <article>
                        <span>Toroidal 2<span>
                        <br>
                        <code>
                            ${printMatrixTwo}
                        </code>
                    </article>
                    <article>
                        <span>Test Result<span>
                        <br>
                        <code>
                            ${printMatrixFusion}
                        </code>
                    </article>
                </section>
            </article>
            </article>
        `;
    }
    document.getElementById("TEST_GENERATOR").innerHTML = text;
}