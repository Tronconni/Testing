var expect = chai.expect;
const restaurante = new Restaurant(
	1,
	'TAO Uptown',
	'Asiática',
	'Nueva York',
	[ '13:00', '15:30', '18:00' ],
	'../img/asiatica1.jpg',
	[ 6, 7, 9, 10, 5 ]
);
const reservaUno = new Reserva(new Date('March 07 2019 13:30'), 200, 1, '');
const reservaDos = new Reserva(new Date('March 07 2019 15:30'), 150, 3, '');
const reservaTres = new Reserva(new Date('March 06 2019 15:30'), 200, 1, 'DES15');
const reservaCuatro = new Reserva(new Date('March 05 2019 15:30'), 300, 1, 'DES1');
const reservaCinco = new Reserva(new Date('March 05 2019 13:30'), 500, 10, 'DES200');

describe('Reserva de horario que no existe', function() {
	it('se chequea que sucede si el horario pedido no esta', function() {
		restaurante.reservarHorario('12:00');
		expect(restaurante.horarios.length).to.eql(3);
	});
});

describe('Reserva de horario sin parametro', function() {
	it('se chequea que sucede si el horario pedido no esta', function() {
		restaurante.reservarHorario(5);
		expect(restaurante.horarios.length).to.eql(3);
	});
});

describe('Reserva de horario existente', function() {
	it('se elimina el horario correspondiente del arreglo', function() {
		restaurante.reservarHorario('13:00');
		expect(restaurante.horarios).to.eql([ '15:30', '18:00' ]);
	});
});

describe('Chequeo de calificacion con 0', function() {
	it('verifica que la calificacion 0 se agregue correctamente', function() {
		restaurante.calificar(0);
		// mantengo el promedio del array
		expect(restaurante.obtenerPuntuacion(0)).to.eql(7);
	});
});

describe('Chequeo de calificacion numero borde: 10', function() {
	it('verifica que la calificacion se agregue correctamente', function() {
		restaurante.calificar(10);
		expect(restaurante.obtenerPuntuacion(10)).to.eql(8);
	});
});

describe('Chequeo de busqueda de restaurantes inexistentes', function() {
	it('verifica que si el restaurante no este en el listado devuelva un mensaje', function() {
		expect(listado.buscarRestaurante('')).to.eql('No se ha encontrado ningún restaurant');
	});
});

describe('Chequeo de busqueda de restaurantes existente', function() {
	it('verifica que se busque el restaurante correctamente', function() {
		expect(listado.buscarRestaurante(1).id).to.eql(restaurante.id);
	});
});

describe('Filtrados inexistentes, devuelve la lista completa de restaurantes', function() {
	it('verifica que el filtrado inexistente funcione correctamente', function() {
		expect(listado.obtenerRestaurantes(null, null, null).length).to.eql(24);
	});
});

describe('Filtrados por ubicacion', function() {
	it('verifica que el filtrado de ubicacion funcione correctamente', function() {
		expect(listado.obtenerRestaurantes(null, 'Nueva York', null).length).to.eql(7);
	});
});

describe('Filtrados por rubro', function() {
	it('verifica que el filtrado de rubro funcione correctamente', function() {
		expect(listado.obtenerRestaurantes(null, null, '15:30').length).to.eql(4);
	});
});

describe('Calcula un precio base con cero personas', function() {
	it('verifica que si la cantidad de personas es igual a cero el precio sea cero', function() {
		reservaUno.cantidadPersonas = 0;
		expect(reservaUno.calcularPrecioBase()).to.eql(0);
	});
});

describe('Calcula un precio base con 10 personas', function() {
	it('verifica que si la cantidad de personas es igual a cero el precio sea cero', function() {
		reservaUno.cantidadPersonas = 10;
		expect(reservaUno.calcularPrecioBase()).to.eql(2000);
	});
});

describe('Calcula un descuento del 0%', function() {
	it('verifica que el grupo de personas no obtenga descuento', function() {
		reservaUno.cantidadPersonas = 1;
		expect(reservaUno.calcularDescuentosGrupo()).to.eql(0);
	});
});

describe('Calcula un descuento del 5%', function() {
	it('verifica que el grupo de personas obtenga un 5%', function() {
		reservaUno.cantidadPersonas = 6;
		expect(reservaUno.calcularDescuentosGrupo()).to.eql(60);
	});
});

describe('Calcula un descuento del 10%', function() {
	it('verifica que el grupo de personas obtenga un 10%', function() {
		reservaUno.cantidadPersonas = 8;
		expect(reservaUno.calcularDescuentosGrupo()).to.eql(160);
	});
});

describe('Calcula un descuento del 15%', function() {
	it('verifica que el grupo de personas obtenga un 15%', function() {
		reservaUno.cantidadPersonas = 9;
		expect(reservaUno.calcularDescuentosGrupo()).to.eql(270);
	});
});

describe('Calcula un descuento DES1', function() {
	it('verifica que el descuento aplicado sea el precio de una persona', function() {
		reservaUno.codigoDescuento = 'DES1';
		expect(reservaUno.calcularDescuentosPorCodigo()).to.eql(reservaUno.precioXpersona);
	});
});

describe('Calcula un descuento DES15', function() {
	it('verifica que el descuento aplicado sea el precio de una persona', function() {
		expect(reservaTres.calcularDescuentosPorCodigo()).to.eql(30);
	});
});

describe('Calcula un descuento DES200', function() {
	it('verifica que el descuento aplicado sea el precio de una persona', function() {
		reservaTres.codigoDescuento = 'DES200';
		reservaTres.precioXpersona = 400;
		expect(reservaTres.calcularDescuentosPorCodigo()).to.eql(200);
	});
});

// --------------------------------------------------------------------------------------------------------

describe('Calcula adicional por horario + 5%', function() {
	it('Verifica que sume 5% si la reserva es 13-14/20-21 hrs.', function() {
		const reservaUno = new Reserva(new Date('March 07 2019 13:30'), 200, 1, '');
		expect(reservaUno.calcularAdicionales()).to.eql(10);
	});
});

describe('Calcula adicional por dia (sabado)+ 10%', function() {
	it('Verifica que sume 10% si la reserva es sabado o domingo', function() {
		const reservaUno = new Reserva(new Date('March 09 2019 15:30'), 200, 1, '');
		expect(reservaUno.calcularAdicionales()).to.eql(20);
	});
});

describe('Calcula adicional por dia (domingo)+ 10%', function() {
	it('Verifica que sume 10% si la reserva es sabado o domingo', function() {
		const reservaUno = new Reserva(new Date('March 10 2019 15:30'), 200, 1, '');
		expect(reservaUno.calcularAdicionales()).to.eql(20);
	});
});

describe('Calcula el costo total segun el objeto instanciado', function() {
	it('Verifica que se aplique el adicional segun horario +10% ', function() {
		const reservaUno = new Reserva(new Date('March 07 2019 13:30'), 200, 1, '');
		expect(reservaUno.calcularCostoTotal()).to.eql(210);
	});
});

describe('Calcula el costo total segun el objeto instanciado', function() {
	it('Verifica que no se aplique ningun descuento ni adicional', function() {
		expect(reservaDos.calcularCostoTotal()).to.eql(450);
	});
});

describe('Calcula el costo total segun el objeto instanciado', function() {
	it('Verifica que no se aplique ningun descuento ni adicional', function() {
		const reservaCuatro = new Reserva(new Date('March 05 2019 15:30'), 300, 1, 'DES1');
		expect(reservaCuatro.calcularCostoTotal()).to.eql(0);
	});
});

describe('Calcula el costo total segun el objeto instanciado', function() {
	it('Verifica se apliquen los descuentos y adicionales correspondientes', function() {
		expect(reservaCinco.calcularCostoTotal()).to.eql(4300);
	});
});
