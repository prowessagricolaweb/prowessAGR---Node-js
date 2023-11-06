import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './CategoriesPage.css';
import ModalAddCategory from '../components/ModalAddCategory';
import ModalEditCategory from '../components/ModalEditCategory';
import { getCategories } from '../services/category';

const CategoryList = () => {
  const [categories, setCategories] = useState([]); // Cambiamos a "categories" en lugar de "products"
  const WEBURL = process.env.REACT_APP_API_URL
  const ITEMS_PER_PAGE = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null); // Cambiamos a "categoryToEdit"
  const [sortCriteria, setSortCriteria] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const token = localStorage.getItem('token');

  const [categoryToUpdate, setCategoryToUpdate] = useState(null); // Cambiamos a "categoryToUpdate"

  useEffect(() => {

    getCategory(token);
    if(categoriesToDisplay){
      setIsLoading(true);
    }
  }, []);

  const getCategory= async (token) => {
    try {
      const res = await getCategories(token);
      console.log(res);
      const data = res.data;
      setCategories(data);
    } catch (error) {
      console.error('Error al cargar las categorías', error);
    }
  };

  const handleDelete = (categoryId) => {
    fetch(`${process.env.REACT_APP_API_URL}${categoryId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setCategories(categories.filter((category) => category.id !== categoryId)); // Cambiamos "products" a "categories"
        } else {
          console.error('Error al eliminar la categoría en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error de red al eliminar la categoría', error);
      });
  };

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setCategoryToEdit(category);
    setIsEditModalOpen(true);
  };

  const handleEdit = (editedCategory) => {
    setCategoryToUpdate(editedCategory);
  };

  useEffect(() => {
    if (categoryToUpdate) {
      handleUpdateCategory();
    }
  }, [categoryToUpdate]);

  const handleUpdateCategory = async(token) => {
    if (!categoryToUpdate) {
      return;
    }
    fetch(`${WEBURL}fb/categoria/update/${categoryToUpdate.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryToUpdate),
    })
      .then((response) => {
        if (response.ok) {
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category.id === categoryToUpdate.id ? categoryToUpdate : category
            )
          );
          setIsEditModalOpen(false);
        } else {
          console.error('Error al guardar los cambios en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error de red al guardar los cambios', error);
      });
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  let sortedAndFilteredCategories = [...categories];

  if (sortCriteria) {
    sortedAndFilteredCategories.sort((a, b) =>
      a[sortCriteria] > b[sortCriteria] ? 1 : -1
    );
  }

  if (filterCategory) {
    sortedAndFilteredCategories = sortedAndFilteredCategories.filter(
      (category) =>
        category.nombre.toLowerCase().includes(filterCategory.toLowerCase())
    );
  }

  const totalPages = Math.ceil(sortedAndFilteredCategories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const categoriesToDisplay = sortedAndFilteredCategories.slice(startIndex, endIndex);

  return (
     isLoading===false ? (<p>Cargando...</p>):(
      <div className="container-product-list">
      <h1>Lista de Categorías</h1>
            <div className='btn-add-container'>
            <button onClick={handleOpenModal} className='btn-add-product'>Agregar Categoría</button>
          </div>
          <div>
            <ModalAddCategory isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <ModalEditCategory
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              categoryToEdit={categoryToEdit}
              handleEdit={handleEdit}
            />
          <div className="filter-row">
            <label>Filtrar por Categoría:</label>
            <input
              type="text"
              value={filterCategory}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
          </div>
          <div className="header-row-category-list">
            <b onClick={() => handleSort('nombre')}>Nombre</b>
            <b>Descripción</b>
            <b>Acciones</b>
          </div>
    
          <div className="container-products">
            {categoriesToDisplay.map((category) => (
              <div className="category" key={category.id}>
                <div>{category.nombreCategoria}</div>
                <div>{category.descripcionCategoria}</div>
                <div className='actions-container'>
                  <FontAwesomeIcon
                    className="fa-icon-edit"
                    icon={faPenToSquare}
                    onClick={() => handleEditCategory(category)}
                  />
                  <FontAwesomeIcon
                    className="fa-icon-trash"
                    icon={faTrash}
                    onClick={() => handleDelete(category.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
          
    </div>
    ) 
  );
};

export default CategoryList;
