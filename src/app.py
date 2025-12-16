"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import cloudinary  # cloudinary -eb
import cloudinary.uploader  # cargador cloudinary -eb
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import JWTManager
from api.utils import APIException, generate_sitemap
from api.models import db
from flask_cors import CORS
from api.admin import setup_admin
from api.commands import setup_commands
from api.auth_routes import auth
from api.cart_routes import cart_order
from api.product_routes import product
from dotenv import load_dotenv  # config global cloudinary -eb
from api.image_routes import image_bp  # rutas de imágenes -eb

#configuración api cloudinary -eb

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET'),
    secure=True
)

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False

CORS(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "my_secret_key"

db.init_app(app)
MIGRATE = Migrate(app, db, compare_type=True)

# JWT
jwt = JWTManager(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)


# Importar los Blueprints DESPUÉS de inicializar 'app' y 'db'

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(auth, url_prefix='/api/auth')

# Registrar rutas de productos
app.register_blueprint(product, url_prefix='/api/')

# Registrar rutas de carrito/pedidos
app.register_blueprint(cart_order, url_prefix='/api/')


# Registrar rutas relacionadas con las imágenes (galería, subida y eliminación)
app.register_blueprint(image_bp, url_prefix='/api') 

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
