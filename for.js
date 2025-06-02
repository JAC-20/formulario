
    function validarRut(rut) {
      return /^[0-9]+-[0-9kK]{1}$/.test(rut);
    }

    function validarFecha(fecha) {
      return /^\d{2}\/\d{2}\/\d{4}$/.test(fecha);
    }

    function validarPassword(password) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/.test(password);
    }

    function mostrarError(id, mensaje) {
      const input = document.getElementById(id);
      input.classList.add("error");
      document.getElementById(`error-${id}`).textContent = mensaje;
    }

    function limpiarErrores() {
      document.querySelectorAll(".form-control").forEach((input) => input.classList.remove("error"));
      document.querySelectorAll(".mensaje-error").forEach((div) => (div.textContent = ""));
    }

    function cancelarFormulario() {
      document.getElementById("formulario").reset();
      limpiarErrores();
    }

    document.getElementById("formulario").addEventListener("submit", function (e) {
      e.preventDefault();
      limpiarErrores();
      let valido = true;

      const nombre = document.getElementById("nombre").value.trim();
      const rut = document.getElementById("rut").value.trim();
      const fecha = document.getElementById("fechaNacimiento").value.trim();
      const email = document.getElementById("email").value.trim();
      const cv = document.getElementById("curriculum").files[0];
      const password = document.getElementById("password").value;
      const repetirPassword = document.getElementById("repetirPassword").value;

      if (!nombre) {
        mostrarError("nombre", "El nombre es obligatorio.");
        valido = false;
      }

      if (!validarRut(rut)) {
        mostrarError("rut", "RUT inválido. Debe tener formato 12345678-9.");
        valido = false;
      }

      if (fecha && !validarFecha(fecha)) {
        mostrarError("fechaNacimiento", "Formato de fecha inválido. Use dd/MM/yyyy.");
        valido = false;
      }

      if (cv && !["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(cv.type)) {
        mostrarError("curriculum", "Solo se permiten archivos PDF o DOCX.");
        valido = false;
      }

      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        mostrarError("email", "Email inválido.");
        valido = false;
      }

      if (!validarPassword(password)) {
        mostrarError("password", "La contraseña debe tener 6-12 caracteres, mayúscula, minúscula y número.");
        valido = false;
      }

      if (password !== repetirPassword) {
        mostrarError("repetirPassword", "Las contraseñas no coinciden.");
        valido = false;
      }

      if (valido) {
        alert("Formulario enviado correctamente.");
        cancelarFormulario();
      }
    });
  