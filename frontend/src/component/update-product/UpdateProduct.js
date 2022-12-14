import './update-product.scss';
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import AlertBox from '../alert-box/AlertBox';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { categories } from '../../constants';
import { clearErrors, updateProduct } from '../../redux/actions/productAction';
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, UPDATE_PRODUCT_RESET } from '../../redux/constants/productConstants';
import axios from 'axios';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

function UpdateProduct() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { error: updateError, loading: updateLoading, isUpdated } = useSelector((state) => state.product);
    const { loading } = useSelector((state) => state.productDetails);
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [productsImg, setProductsImg] = useState([])
    const [oldproductsImg, setOldProductsImg] = useState([])
    const [productsImgPreview, setProductsImgPreview] = useState([])

    useEffect(() => {

        const fetchProductDetails = async () => {
            try {
                dispatch({
                    type: PRODUCT_DETAILS_REQUEST
                });

                const { data } = await axios.get(`/api/v1/product/${productId}`);

                dispatch({
                    type: PRODUCT_DETAILS_SUCCESS,
                    payload: data.product
                })

                setName(data.product.name);
                setPrice(data.product.price);
                setDescription(data.product.description);
                setCategory(data.product.category);
                setStock(data.product.stock);
                setOldProductsImg(data.product.images);
                setProductsImgPreview([])
            } catch (error) {
                dispatch({
                    type: PRODUCT_DETAILS_FAIL,
                    payload: error.response
                })
            }
        }

        fetchProductDetails()

        if (updateError) {
            dispatch(clearErrors())
        }
        return () => {
            if (isUpdated) {
                dispatch({ type: UPDATE_PRODUCT_RESET });
            }
        }
    }, [dispatch, updateError, isUpdated, productId])

    const handleProductSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        productsImg.forEach((image) => {
            myForm.append("images", image)
        })

        dispatch(updateProduct(productId, myForm))
    }

    const productFileChoose = (e) => {
        const files = Array.from(e.target.files);

        if (files) {
            files.forEach((file) =>{
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = () => {
                    if(reader.readyState === 2){
                        setProductsImg((old)=> [...old, reader.result]);
                        setProductsImgPreview((old)=> [...old, reader.result]);
                        setOldProductsImg([])
                    }
                }
            })
        } else {
            setProductsImg([]);
            setProductsImgPreview([]);
        }
    }

    return (
        <div className='updateProduct'>
            <div className="wrapper">
                <div className="wrapper__title">
                    <div className="wrapper__title__heading">Update product</div>
                </div>
                {updateError && <AlertBox type="error" msg={updateError.data.message} />}
                {isUpdated && <AlertBox type="success" msg="Successfully! Product Updated" />}

                {loading ? <Loader /> :
                    <div className="wrapper__form">
                        <form onSubmit={handleProductSubmit} className="wrapper__form__container">
                            <div className="wrapper__form__container__input">
                                <div className="wrapper__form__container__input__icon"><AddShoppingCartOutlinedIcon /></div>
                                <input className='padding-left' type="text" placeholder="Product Name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="wrapper__form__container__input">
                                <div className="wrapper__form__container__input__icon"><CurrencyRupeeOutlinedIcon /></div>
                                <input className='padding-left' type="number" placeholder="Price" autoComplete="off" value={price} onChange={(e) => setPrice(e.target.value)} required />
                            </div>
                            <div className="wrapper__form__container__input">
                                <div className="wrapper__form__container__input__icon"><DescriptionOutlinedIcon /></div>
                                <input className='padding-left' type="text" placeholder="Product Description" autoComplete="off" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </div>

                            <div className="wrapper__form__container__input">
                                <div className="wrapper__form__container__input__icon"><CategoryOutlinedIcon /></div>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                                    <option value="">Choose Category</option>
                                    {
                                        categories.map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="wrapper__form__container__input">
                                <div className="wrapper__form__container__input__icon"><Inventory2OutlinedIcon /></div>
                                <input className='padding-left' type="number" placeholder="Stock" autoComplete="off" value={stock} onChange={(e) => setStock(e.target.value)} required />
                            </div>

                            <div className="wrapper__form__container__input">
                                <input type="file" accept="image/*" className='wrapper__form__container__input__file' onChange={productFileChoose} multiple />
                            </div>
                            <div className="wrapper__form__container__input">
                                <div className="wrapper__form__container__input__productPreview">
                                    {
                                        oldproductsImg && oldproductsImg.map((image, index) => (
                                            <img key={index} src={image.url} alt="Product Preview" />
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="wrapper__form__container__input">
                                <div className="wrapper__form__container__input__productPreview">
                                    {
                                        productsImgPreview.map((file, index) => (
                                            <img key={index} src={file} alt="Product Preview" />
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="wrapper__form__container__btn">
                                <button className="wrapper__form__container__btn__button" disabled={loading}>
                                    Update {updateLoading ? <Loader small={true} /> : <CheckOutlinedIcon className="wrapper__form__container__btn__button__icon" />}
                                </button>
                            </div>
                            <div className="wrapper__form__container__bottom">
                                <p className="wrapper__form__container__bottom__title"><span>View Products</span><Link to="/admin/products" className='wrapper__form__container__bottom__title__link'><ArrowForwardOutlinedIcon className='wrapper__form__container__bottom__title__link__icon' /></Link></p>
                            </div>
                        </form>
                    </div>
                }
            </div>

        </div>
    )
}

export default UpdateProduct