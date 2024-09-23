const productosPorMarca = {
    AMD: {
        "Ryzen 5": 200,
        "Ryzen 7": 300
    },
    Nvidia: {
        "RTX 3060": 400,
        "RTX 3080": 700
    },
    Intel: {
        "i5": 250,
        "i7": 350
    }
};
localStorage.setItem("productosPorMarca", JSON.stringify(productosPorMarca))
document.body.innerHTML =`
    <header> 
        <h1>HardSoluciones</h1>
        <a href="./HTML/admin.html">Admin</a>
    </header>
    <section class="contenedor">
        <div class="carta">
            <h2>Formulario de Producto</h2>
            <form id="formulario">
                <label for="marca">Marca:</label>
                <select id="marca" name="marca" required>
                    <option value="" disabled selected>Seleccionar marca</option>
                    <option value="AMD">AMD</option>
                    <option value="Nvidia">Nvidia</option>
                    <option value="Intel">Intel</option>
                </select>
                
                <label for="nombre-producto">Producto:</label>
                <select id="nombre-producto" name="nombre-producto" required>
                    <option value="" disabled selected>Seleccionar producto</option>
                </select>
                
                <label for="precio">Precio:</label>
                <input type="text" id="precio" name="precio" readonly>
                
                <button type="button">Agregar</button>
            </form>
        </div>
    </section>
    <div class="tabla">
        <table id="tabla-productos">
            <thead>
                <tr>
                    <th>Marca</th>
                    <th>Producto</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                <!-- Aquí van las filas -->
            </tbody>
        </table>
        <button id="borrador-tabla">Borrar Datos</button>
        <div class="total">
            <strong>Total:</strong> <span id="precio-Total">0.00</span>
        </div>
    </div>`
document.addEventListener('DOMContentLoaded', function() {
    const marcaIngresada = document.getElementById('marca');
    const productoIngresado = document.getElementById('nombre-producto');
    const precioIngresado = document.getElementById('precio');
    const tabla = document.querySelector('#tabla-productos tbody');
    const precioTotal = document.getElementById('precio-Total');
    marcaIngresada.addEventListener('change', function() {
        const marcaSeleccionada = marcaIngresada.value;
        productoIngresado.innerHTML = '<option value="" disabled selected>Seleccionar producto</option>';
        if (marcaSeleccionada) {
            const productos = productosPorMarca[marcaSeleccionada];
            for (const [producto, precio] of Object.entries(productos)) {
                const opcion = document.createElement('option');
                opcion.value = producto;
                opcion.textContent = producto;
                productoIngresado.appendChild(opcion);
            }
        }
    });
    productoIngresado.addEventListener('change', function() {
        const marcaSeleccionada = marcaIngresada.value;
        const productoSeleccionado = productoIngresado.value;

        if (marcaSeleccionada && productoSeleccionado) {
            const precio = productosPorMarca[marcaSeleccionada][productoSeleccionado];
            precioIngresado.value = precio;
        }
    });
    document.querySelector('button[type="button"]').addEventListener('click', function() {
        const marca = marcaIngresada.value;
        const producto = productoIngresado.value;
        const precio = precioIngresado.value;
        if (marca && producto && precio) {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${marca}</td>
                <td>${producto}</td>
                <td>${precio}</td>
            `;
            tabla.appendChild(fila);
            actualizarTotal();
        }
    });
    function actualizarTotal() {
        let total = 0;
        const filas = tabla.querySelectorAll('tr');
        filas.forEach(fila => {
            const precioCelda = fila.querySelector('td:last-child');
            total += parseFloat(precioCelda.textContent);
        });
        precioTotal.textContent = total.toFixed(2);
    }
    window.borrarTabla = function() {
        tabla.innerHTML = '';
        precioTotal.textContent = '0.00';
    };
    const borrador = this.getElementById('borrador-tabla');
    borrador.addEventListener('click', borrarTabla)
});
