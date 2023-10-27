import datetime
from sqlalchemy import Column, DECIMAL, Double, String, BigInteger, Integer, SmallInteger, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.domain import Base


class Hospital(Base):
    __tablename__ = 'hospital'
    
    hospital_id = Column(Integer, primary_key=True, autoincrement=True)
    
    hospital_type_id = Column(SmallInteger, ForeignKey('hospital_type.hospital_type_id'))
    
    ykiho = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False, index=True)
    address = Column(String(255), nullable=False)
    latitude = Column(DECIMAL(10,7), nullable=False, default=0, index=True) #없는 경우 존재
    longitude = Column(DECIMAL(10,7), nullable=False, default=0, index=True) #없는 경우 존재
    tel = Column(String(255), nullable=True, default=None) #없는 경우 존재
    homepage_url = Column(String(255), nullable=True, default=None) #없는 경우 존재
    modified_at = Column(DateTime, nullable=False, default=datetime.datetime.now)

    #Many to One
    hospital_type = relationship('HospitalType', back_populates='hospitals')
    #One to Many
    prices = relationship('Price', back_populates='hospital')