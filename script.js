document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");
    const formAlert = document.getElementById("formAlert");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío por defecto para validar en el cliente

        // Captura de valores de los campos del formulario
        const nombreInput = document.getElementById("nombre");
        const emailInput = document.getElementById("email");
        const telefonoInput = document.getElementById("telefono");
        const programaSelect = document.getElementById("programa");
        const terminosCheckbox = document.getElementById("terminos");

        let isValid = true;

        // 1. Validación del campo Nombre (Texto no vacío)
        if (nombreInput.value.trim() === "") {
            nombreInput.classList.add("is-invalid");
            isValid = false;
        } else {
            nombreInput.classList.remove("is-invalid");
            nombreInput.classList.add("is-valid");
        }

        // 2. Validación de Correo Electrónico (Estructura estándar mediante Expresión Regular)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add("is-invalid");
            isValid = false;
        } else {
            emailInput.classList.remove("is-invalid");
            emailInput.classList.add("is-valid");
        }

        // 3. Validación de Teléfono (Numérico de 9 dígitos)
        const telefonoRegex = /^[0-9]{9}$/;
        if (!telefonoRegex.test(telefonoInput.value.trim())) {
            telefonoInput.classList.add("is-invalid");
            isValid = false;
        } else {
            telefonoInput.classList.remove("is-invalid");
            telefonoInput.classList.add("is-valid");
        }

        // 4. Validación de Selección de Programa
        if (programaSelect.value === "") {
            programaSelect.classList.add("is-invalid");
            isValid = false;
        } else {
            programaSelect.classList.remove("is-invalid");
            programaSelect.classList.add("is-valid");
        }

        // 5. Validación de Términos y Condiciones
        if (!terminosCheckbox.checked) {
            terminosCheckbox.classList.add("is-invalid");
            isValid = false;
        } else {
            terminosCheckbox.classList.remove("is-invalid");
            terminosCheckbox.classList.add("is-valid");
        }

        // Evaluación final del estado de validación
        if (!isValid) {
            formAlert.className = "alert alert-danger";
            formAlert.textContent = "❌ Por favor completa correctamente todos los campos marcados.";
            formAlert.classList.remove("d-none");
            return;
        }

        // Simulación de envío de datos mediante método POST exitoso
        const datosRegistro = {
            nombre: nombreInput.value.trim(),
            email: emailInput.value.trim(),
            telefono: telefonoInput.value.trim(),
            programa: programaSelect.value,
            metodoEnvio: "POST"
        };

        // Respuesta visual dinámica al usuario en el DOM
        formAlert.className = "alert alert-success";
        formAlert.innerHTML = `✅ ¡Registro enviado con éxito al <strong>Instituto Futuro Brillante</strong>! Nos pondremos en contacto contigo pronto, <strong>${datosRegistro.nombre}</strong>.`;
        formAlert.classList.remove("d-none");

        // Reiniciar formulario tras envío exitoso
        form.reset();
        
        // Remover clases de validación visual de Bootstrap después de 4 segundos
        setTimeout(() => {
            [nombreInput, emailInput, telefonoInput, programaSelect, terminosCheckbox].forEach(el => {
                el.classList.remove("is-valid");
            });
        }, 4000);
    });
});