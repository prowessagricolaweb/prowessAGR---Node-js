import React, { useEffect } from 'react';
import './ModalAddProducts.css';

const ModalAddProducts = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const body = document.body;
      body.classList.add('modal-open');
      return () => {
        body.classList.remove('modal-open');
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-product">
        <div className='form-container'>
          <form className='modal-form'>
            <div className="form-group-pair">
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input type="number" className="form-control" />
              </div>
            </div>
            <div className="form-group-pair">
              <div>
                <label htmlFor="category">Stock</label>
                <input type="number" className="form-control" />
              </div>
              <div>
                <label className='form-check-label' htmlFor='category'>Vendedor</label>
                <select className='form-control'>
                  <option value='1'>Vendedor 1</option>
                  <option value='2'>Vendedor 2</option>
                  <option value='3'>Vendedor 3</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea className="form-control" />
            </div>
            <div className="form-group">
              <label className='input-file-container'>
                Subir imagen
                <input className="img-input" type="file" />
              </label>
            </div>
            <div className="form-group">
              <label className='btn-save-container'>Guardar</label>
              <button className="btn-save">Guardar</button>
            </div>
          </form>
        </div>
        <span className="modal-close-product" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default ModalAddProducts;
