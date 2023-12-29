import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../reusables/InputField';
import Button from '../reusables/Button';
import Heading from '../reusables/Heading';
import { startCreateProduct, startEditProduct, getProductById } from '../../actions/productsAction';
import { useNavigate } from 'react-router-dom';

const AddProduct = (props) => {
    const { productId, handleClose } = props;
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: null,
        categories: '',
        formErrors: {},
    });

    const dispatch = useDispatch();
    const suppId = useSelector((state) => state.supplierLogin.data._id);

    useEffect(() => {
        if (productId) {
            dispatch(getProductById(productId))
                .then((data) => {
                    setProduct({
                        name: data.name,
                        price: data.price.toString(),
                        description: data.description,
                        image: data.image,
                        categories: data.categories.join(', '),
                        formErrors: {},
                    });
                })
                .catch((error) => {
                    console.log('Error fetching product:', error);
                });
        }
    }, [productId, dispatch]);

    const runValidations = () => {
        const errors = {};

        if (!product.name.trim()) {
            errors.name = "Product name can't be blank";
        }
        if (!product.price.trim()) {
            errors.price = "Price can't be blank";
        } else if (isNaN(product.price)) {
            errors.price = 'Price must be a valid number';
        }
        if (!product.description.trim()) {
            errors.description = "Description can't be blank";
        }
        if (!product.categories.trim()) {
            errors.categories = "Please enter or select a category";
        }
        if (!product.image) {
            errors.image = "Please select a image";
        }

        setProduct((prevProduct) => ({ ...prevProduct, formErrors: errors }));
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = runValidations();

        if (Object.keys(errors).length === 0) {
            const { name, price, description, image, categories } = product;

            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('supplierId', suppId);
            formData.append('description', description);
            formData.append('categories', categories.split(',').map((category) => category.trim()).join(','));
            formData.append('file', image);

            const redirect = () => navigate('/products');
            const closeModal = () => handleClose();

            if (!productId) {
                dispatch(startCreateProduct(formData, suppId, redirect));
            } else {
                dispatch(startEditProduct(formData, productId, closeModal));
            }
        }
    };

    const handleChange = (e) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;

        setProduct((prevProduct) => ({
            ...prevProduct,
            [e.target.name]: value,
        }));
    };


    const handleClick = () => navigate('/products');

    return (
        <div className='container my-5'>
            {!productId && <Heading className='mb-4' type='h3' title='Add Products' />}

            <form onSubmit={handleSubmit}>
                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <InputField
                            className='form-control'
                            type='text'
                            value={product.name}
                            handleChange={handleChange}
                            name='name'
                            placeholder='Enter product name'
                        />
                        {product.formErrors.name && (
                            <div className='form-text'>{product.formErrors.name}</div>
                        )}
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <InputField
                            className='form-control'
                            type='number'
                            value={product.price}
                            handleChange={handleChange}
                            name='price'
                            placeholder='Enter product price'
                        />
                        {product.formErrors.price && (
                            <div className='form-text'>{product.formErrors.price}</div>
                        )}
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <InputField
                            className='form-control'
                            type='text'
                            value={product.description}
                            handleChange={handleChange}
                            name='description'
                            placeholder='Enter product description'
                        />
                        {product.formErrors.description && (
                            <div className='form-text'>{product.formErrors.description}</div>
                        )}
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <InputField
                            className='form-control'
                            type='text'
                            value={product.categories}
                            handleChange={handleChange}
                            name='categories'
                            placeholder='Enter categories (comma-separated)'
                        />
                        {product.formErrors.categories && (
                            <div className='form-text'>{product.formErrors.categories}</div>
                        )}
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <input
                            className='form-control'
                            type='file'
                            accept='image/*'
                            onChange={handleChange}
                            name='image'
                        />
                        {product.formErrors.image && (
                            <div className='form-text'>{product.formErrors.image}</div>
                        )}
                    </div>
                </div>

                <InputField
                    className='btn btn-outline-primary'
                    type='submit'
                    value={productId ? 'Save Changes' : 'Add'}
                />

                {productId ? (
                    <Button
                        type='button'
                        className='btn btn-outline-secondary mx-4'
                        handleClick={handleClose}
                        value='Cancel'
                    />
                ) : (
                    <Button
                        type='button'
                        className='btn btn-outline-secondary mx-4'
                        handleClick={handleClick}
                        value='Cancel'
                    />
                )}
            </form>
        </div>
    );
};

export default AddProduct;