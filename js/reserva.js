// creo una clase reserva con sus atributos
class Reserva {
	constructor(fechaYhora, precioXpersona, cantidadPersonas, codigoDescuento) {
		this.fechaYhora = fechaYhora;
		this.precioXpersona = precioXpersona;
		this.cantidadPersonas = cantidadPersonas;
		this.codigoDescuento = codigoDescuento;
	}
	// calculo el precio base
	calcularPrecioBase() {
		const precioBase = this.cantidadPersonas * this.precioXpersona;
		return precioBase;
	}
	// calculo el descuento por grupo
	calcularDescuentosGrupo() {
		let descuentoTotal = 1;
		if (this.cantidadPersonas < 4) descuentoTotal = 0;
		if (this.cantidadPersonas >= 4 && this.cantidadPersonas <= 6) descuentoTotal *= 5;
		if (this.cantidadPersonas >= 7 && this.cantidadPersonas <= 8) descuentoTotal *= 10;
		if (this.cantidadPersonas > 8) descuentoTotal *= 15;
		return descuentoTotal / 100 * this.calcularPrecioBase();
	}
	// calculo el descuento por codigo
	calcularDescuentosPorCodigo() {
		let descuentoPorCodigo = 0;
		if (this.codigoDescuento === 'DES1') descuentoPorCodigo = this.precioXpersona;
		if (this.codigoDescuento === 'DES15') descuentoPorCodigo = 0.15 * this.calcularPrecioBase();
		if (this.codigoDescuento === 'DES200') descuentoPorCodigo = 200;
		return descuentoPorCodigo;
	}
	// calculo los adicionales
	calcularAdicionales() {
		let adicional = 0;
		let date = this.fechaYhora;
		let day = date.getDay();
		let hour = date.getHours();
		if ((hour >= 13 && hour <= 14) || (hour >= 20 && hour <= 21)) adicional = 0.05 * this.calcularPrecioBase();
		if (day === 6 || day === 0) adicional = 0.1 * this.calcularPrecioBase();
		return adicional;
	}
	// calculo el costo total
	calcularCostoTotal() {
		return (
			this.calcularPrecioBase() +
			this.calcularAdicionales() -
			this.calcularDescuentosGrupo() -
			this.calcularDescuentosPorCodigo()
		);
	}
}
