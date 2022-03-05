import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'

const UpdateProduct = () => {

    const navigate = useNavigate();
    const params = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [Read_Time, setRead_Time] = useState(0);
    const [description, setDescription] = useState('');
    const [description_1, setDescription_1] = useState('');
    const [description_2, setDescription_2] = useState('');
    const [description_3, setDescription_3] = useState('');
    const [description_4, setDescription_4] = useState('');
    const [description_5, setDescription_5] = useState('');
    const [blog_intro, setblog_intro] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);

    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

   
    const categories = [
        'Science',
        'Math',
        'Physics',
        'Biology',
        'Chemistry',
        'Software',
        'Computer Science',
        'Electronics', 
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);

    const productId = params.id;

    useEffect(() => {

        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setSeller(product.seller);
            setStock(product.stock)
            setOldImages(product.images)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }


        if (isUpdated) {
            navigate('/admin/products');
            alert.success('Product updated successfully');
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, isUpdated, updateError, product, productId])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('description_1', description_1);
        formData.set('description_2', description_2);
        formData.set('description_3', description_3);
        formData.set('description_4', description_4);
        formData.set('description_5', description_5);

        formData.set('blog_intro', blog_intro);
        formData.set('Read_Time', Read_Time);

        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateProduct(product._id, formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return (
        <Fragment>
            <MetaData title={'Update Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="price_field">Read_Time</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={Read_Time}
                                        onChange={(e) => setRead_Time(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Description-1</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description_1} onChange={(e) => setDescription_1(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Description-2</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description_2} onChange={(e) => setDescription_2(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Description-3</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description_3} onChange={(e) => setDescription_3(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Description-4</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description_4} onChange={(e) => setDescription_4(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description-5</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description_5} onChange={(e) => setDescription_5(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Blog-Intro</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={blog_intro} onChange={(e) => setblog_intro(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                 </label>
                                    </div>

                                    {oldImages && oldImages.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                            </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateProduct