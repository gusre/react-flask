from flask import *
from flask_sqlalchemy import SQLAlchemy
import base64
app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@server/db'
app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)

class User(db.Model):
    Name= db.Column(db.String(45),nullable = False)
    Contact = db.Column(db.String(10),primary_key=True)
    Photo=db.Column(db.LargeBinary, nullable = False)

    def __init__(self,b,c,d):
        self.Name = b
        self.Contact=c
        self.Photo=d


@app.route('/api',methods=['GET'])
def api():
    return {
        'userId':1,
        'title':"flask react",
        'completed':False
    }

@app.route('/datahandler', methods=['POST'])
def insertdata():
    print(request)
    print(request.query_string)
    if request.method == 'POST':
        print(request)
        print(request.query_string)
        data=request.get_json()
        user=data['user']
        print(user)
        num=data['contactnum']
        img=data['photo']
        img=img[22:]
        photo=base64.b64decode(img) 
        new_user=User(user,num,photo)
        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'Status': 'User added'})
        except:
            return jsonify({'Status': 'Image cant be proccessed,change image'})
