var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
	this.id = id;
	this.nombre = nombre;
	this.rubro = rubro;
	this.ubicacion = ubicacion;
	this.horarios = horarios;
	this.imagen = imagen;
	this.calificaciones = calificaciones;
};

// function refactoreada
Restaurant.prototype.reservarHorario = function(horarioReservado) {
	this.horarios = this.horarios.filter(function(horario) {
		return horario !== horarioReservado;
	});
};

Restaurant.prototype.calificar = function(nuevaCalificacion) {
	if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion <= 10) {
		this.calificaciones.push(nuevaCalificacion);
	}
};

Restaurant.prototype.obtenerPuntuacion = function() {
	const calificacionesReturn = this.calificaciones.length === 0 ? 0 : promedio(this.calificaciones);
	return calificacionesReturn;
};

const promedio = (calificaciones) => {
	let suma = calificaciones.reduce((previous, current) => (current += previous));
	let promedio = Math.round(suma / calificaciones.length);
	return promedio;
};
