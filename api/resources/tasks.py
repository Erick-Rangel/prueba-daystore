from flask import request, jsonify, Blueprint

from database import tasks

tasks_bp = Blueprint('routes-tasks', __name__)

@tasks_bp.route("/prueba", methods=['POST'])
def add_task():
    Ciudades = request.json['Ciudades']
    Numero_de_servicios_diarios = request.json['Numero_de_servicios_diarios']
    Meta_para_la_ciudad = request.json['Meta_para_la_ciudad']

    data = (Ciudades, Numero_de_servicios_diarios, Meta_para_la_ciudad)
    task_id = tasks.insert_task(data)

    if task_id:
        task = tasks.select_task_by_id(task_id)
        return jsonify({'message': 'Task added successfully', 'task': task})
    return jsonify({'message': 'Error adding task'})


@tasks_bp.route("/tasks", methods=['GET'])
def get_tasks():
    data = tasks.select_all_tasks()

    if(data):
        return jsonify({'tasks': data})
    elif data == False:
        return jsonify({'message': 'Internal Error'})
    else:
        return jsonify({'message': 'No tasks found'})


@tasks_bp.route("/tasks", methods=['PUT'])
def update_task():
    Ciudades = request.json['Ciudades']
    Numero_de_servicios_diarios = request.json['Numero_de_servicios_diarios']
    Meta_para_la_ciudad = request.json['Meta_para_la_ciudad']
    id_arg = request.args.get('id')

    if tasks.update_task(id_arg, (Ciudades, Numero_de_servicios_diarios, Meta_para_la_ciudad,)):
        task = tasks.select_task_by_id(id_arg)
        return jsonify({'message': 'Task updated successfully', 'task': task})
    return jsonify({'message': 'Error updating task'})


@tasks_bp.route("/tasks", methods=['DELETE'])
def deleted_task():
    id_arg = request.args.get('id')

    if tasks.delete_task(id_arg):
        return jsonify({'message': 'Task deleted successfully'})
    return jsonify({'message': 'Error deleting task'})
