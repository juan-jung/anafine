import datetime
from sqlalchemy import Column, DECIMAL, Double, String, BigInteger, Integer, SmallInteger, Boolean, ForeignKey, DateTime, func
from sqlalchemy.schema import Index
from geoalchemy2 import Geometry
from geoalchemy2.elements import WKTElement
from sqlalchemy.orm import relationship
from app.domain import Base

    
class Hospital(Base):
    __tablename__ = 'hospital'
    __table_args__ = (Index('ix_hospital_type_id_modified_at', 'hospital_type_id', 'modified_at'),)
    
    hospital_id = Column(Integer, primary_key=True, autoincrement=True)
    hospital_type_id = Column(SmallInteger, ForeignKey('hospital_type.hospital_type_id'), nullable=False)
    
    ykiho = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False, index=True)
    address = Column(String(255), nullable=False)
    coordinate = Column(Geometry(geometry_type='POINT', srid=4326), nullable=False, index=True)
    tel = Column(String(255)) #없는 경우 존재
    homepage_url = Column(String(255)) #없는 경우 존재
    modified_at = Column(DateTime, nullable=False, 
                         server_default=func.now(),
                         server_onupdate=func.now())

    #Many to One
    hospital_type = relationship('HospitalType', back_populates='hospitals', lazy='joined')
    #One to Many
    prices = relationship('Price', back_populates='hospital', lazy='joined')
    
    
    def set_coordinate(self, latitude, longitude):
        if not latitude or not longitude:
            latitude, longitude = (0,0)
            
        self.coordinate = WKTElement(f'POINT({latitude} {longitude})', srid=4326)
        
    def __init__(self, **kwargs):
        latitude = kwargs.pop('latitude', None)
        longitude = kwargs.pop('longitude', None)
        super().__init__(**kwargs)
        self.set_coordinate(latitude, longitude)
