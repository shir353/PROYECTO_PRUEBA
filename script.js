document.addEventListener("DOMContentLoaded", () => {

    console.log("JavaScript cargado correctamente");


    /* =========================================================
       1. IMPRIMIR
       ========================================================= */

    const btnImprimir = document.querySelector("#btn-imprimir");

    if (btnImprimir) {

        btnImprimir.addEventListener("click", () => {
            window.print();
        });

    }


    /* =========================================================
       2. MOSTRAR / OCULTAR EXPERIENCIA
       ========================================================= */

    const btnExperiencia =
        document.querySelector("#btn-experiencia");

    const experiencia =
        document.querySelector("#experiencia");

    if (btnExperiencia && experiencia) {

        btnExperiencia.addEventListener("click", () => {

            const estaOculta =
                experiencia.classList.toggle("hidden");

            if (estaOculta) {

                btnExperiencia.textContent =
                    "Mostrar experiencia";

            } else {

                btnExperiencia.textContent =
                    "Ocultar experiencia";

            }

        });

    }


    /* =========================================================
       3. CONTACTO
       ========================================================= */

    const btnContacto =
        document.querySelector("#btn-contacto");

    const mensajeContacto =
        document.querySelector("#mensaje-contacto");

    if (btnContacto && mensajeContacto) {

        btnContacto.addEventListener("click", () => {

            mensajeContacto.textContent =
                "Gracias por visitar mi Curriculum Vitae.";

            mensajeContacto.classList.remove("hidden");

            setTimeout(() => {

                mensajeContacto.classList.add("hidden");

            }, 4000);

        });

    }


    /* =========================================================
       4. AVATAR
       ========================================================= */

    const avatar =
        document.querySelector("#avatar");

    if (avatar) {

        avatar.addEventListener("mouseenter", () => {

            avatar.textContent = "INFO";

        });

        avatar.addEventListener("mouseleave", () => {

            avatar.textContent = "SR";

        });

    }


    /* =========================================================
       5. CLOSURE
       ========================================================= */

    const btnRastreador =
        document.querySelector("#btn-rastreador");

    if (btnRastreador) {

        let contador = 0;

        btnRastreador.addEventListener("click", () => {

            contador++;

            btnRastreador.textContent =
                `Interacciones registradas: ${contador}`;

        });

    }


    /* =========================================================
       6. MODO OSCURO
       ========================================================= */

    const btnTema =
        document.querySelector("#btn-tema");

    if (btnTema) {

        const temaGuardado =
            localStorage.getItem("temaPreferido");

        if (temaGuardado === "oscuro") {

            document.body.classList.add("dark-mode");

            btnTema.textContent = "Modo Claro";

        }


        btnTema.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const esOscuro =
                document.body.classList.contains("dark-mode");

            if (esOscuro) {

                localStorage.setItem(
                    "temaPreferido",
                    "oscuro"
                );

                btnTema.textContent = "Modo Claro";

            } else {

                localStorage.setItem(
                    "temaPreferido",
                    "claro"
                );

                btnTema.textContent = "Modo Oscuro";

            }

        });

    }


    /* =========================================================
       7. CALL STACK
       ========================================================= */

    const terminalStack =
        document.querySelector("#terminal-callstack");

    const btnCallStack =
        document.querySelector("#btn-callstack");

    const btnClearTerminal =
        document.querySelector("#btn-clear-terminal");


    if (terminalStack && btnCallStack && btnClearTerminal) {

        let logsStack = [];


        function registrarPaso(mensaje) {

            logsStack.push(mensaje);

            terminalStack.textContent =
                logsStack.join("\n");

        }


        function prepararMuestra() {

            registrarPaso(
                "[3] -> Push prepararMuestra()"
            );

            registrarPaso(
                "[3] <- Pop prepararMuestra()"
            );

        }


        function analizarMuestra() {

            registrarPaso(
                "[2] -> Push analizarMuestra()"
            );

            prepararMuestra();

            registrarPaso(
                "[2] <- Pop analizarMuestra()"
            );

        }


        function iniciarLaboratorio() {

            registrarPaso(
                "[1] -> Push iniciarLaboratorio()"
            );

            analizarMuestra();

            registrarPaso(
                "[1] <- Pop iniciarLaboratorio()"
            );

        }


        btnCallStack.addEventListener("click", () => {

            logsStack = [
                "--- INICIO DEL CALL STACK ---"
            ];

            iniciarLaboratorio();

            logsStack.push(
                "--- EJECUCIÓN FINALIZADA ---"
            );

            terminalStack.textContent =
                logsStack.join("\n");

        });


        btnClearTerminal.addEventListener("click", () => {

            logsStack = [];

            terminalStack.textContent =
                "Presiona el botón para observar la pila de ejecución...";

        });

    }


    /* =========================================================
       8. AÑO AUTOMÁTICO
       ========================================================= */

    const anio =
        document.querySelector("#anio");

    if (anio) {

        anio.textContent =
            new Date().getFullYear();

    }


    /* =========================================================
       9. FETCH API
       ========================================================= */

    const btnCargarExito =
        document.querySelector("#btn-cargar-exito");

    const btnCargarError =
        document.querySelector("#btn-cargar-error");

    const detalleSeleccion =
        document.querySelector("#detalle-seleccion");


    async function solicitarDatos(url) {

        if (!detalleSeleccion) {
            return;
        }

        detalleSeleccion.textContent =
            "⏳ Cargando datos...";

        detalleSeleccion.classList.remove("hidden");


        try {

            const respuesta =
                await fetch(url);


            if (!respuesta.ok) {

                throw new Error(
                    `Error HTTP: ${respuesta.status}`
                );

            }


            const datos =
                await respuesta.json();


            detalleSeleccion.textContent =
                `✅ Datos recibidos correctamente: ${datos.length} registros.`;


            return datos;


        } catch (error) {

            console.error(error);

            detalleSeleccion.textContent =
                `❌ Error: ${error.message}`;

        }

    }


    if (btnCargarExito) {

        btnCargarExito.addEventListener(
            "click",
            async () => {

                await solicitarDatos(
                    "https://jsonplaceholder.typicode.com/posts?_limit=3"
                );

            }
        );

    }


    if (btnCargarError) {

        btnCargarError.addEventListener(
            "click",
            async () => {

                await solicitarDatos(
                    "https://jsonplaceholder.typicode.com/recurso-inexistente-404"
                );

            }
        );

    }


    console.log("Todos los eventos fueron configurados");
    

});