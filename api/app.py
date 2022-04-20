from flask import Flask,request,jsonify

from database import prueba, setup

app = Flask(__name__)
setup.create_tables()

@app.route("/prueba", methods=['POST'])
def add_prueba():
     Ciudades = request.json['Ciudades']
     Numero_servicios_diarios = request.json['Numero_servicios_diarios']
     Meta_para_la_ciudad = request.json['Meta_para_la_ciudad']

     data = (Ciudades,Numero_servicios_diarios,Meta_para_la_ciudad)
     prueba_id = prueba.insert_prueba(data)

     if prueba_id:
         prueba = prueba.select_prueba_by_id(prueba_id)
         return jsonify({'prueba': prueba})
     return jsonify({'message': 'error in adding prueba'})



if __name__ == '__main__':
    app.run(debug=True)