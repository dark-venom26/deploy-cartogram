import './new-product.scss';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../component/loader/Loader';
import AlertBox from '../../component/alert-box/AlertBox';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { categories } from '../../constants';
import { clearErrors, createProduct } from '../../redux/actions/productAction';
import { NEW_PRODUCT_RESET } from '../../redux/constants/productConstants';

function NewProduct() {
    const dispatch = useDispatch();
    const { error, loading, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [productsImg, setProductsImg] = useState([])
    const [productsImgPreview, setProductsImgPreview] = useState([])

    useEffect(() => {
        if(error){
            dispatch(clearErrors())
        }
        return()=>{
            if(success){
                dispatch({type: NEW_PRODUCT_RESET});
            }
        }
    },[dispatch, error, success])

    const handleProductSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        productsImg.forEach((image)=>{
            myForm.append("images", image)
        })

        dispatch(createProduct(myForm))

        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setStock("");
        setProductsImg([]);
        setProductsImgPreview([]);
    }

    const productFileChoose = (e) => {
        const files = Array.from(e.target.files);

        if (files) {
            setProductsImg(files);
            setProductsImgPreview(files);
        } else {
            setProductsImg([]);
            setProductsImgPreview([]);
        }
    }



    return (
        <div className='newProduct'>
            <div className="wrapper">
                <div className="wrapper__title">
                    <div className="wrapper__title__heading">New product</div>
                </div>
                {error && <AlertBox type="error" msg={error.data.message} />}
                {success && <AlertBox type="success" msg="Successfully! Product Added" />}
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
                            <input type="file" accept="image/*" className='wrapper__form__container__input__file' onChange={productFileChoose} multiple required />
                        </div>
                        <div className="wrapper__form__container__input">
                            <div className="wrapper__form__container__input__productPreview">
                                {
                                    productsImgPreview.map((file, index) =>(
                                        <img key={index} src={URL.createObjectURL(file)} alt="Product Preview" />
                                    ))
                                }
                            </div>
                        </div>
                        <div className="wrapper__form__container__btn">
                            <button className="wrapper__form__container__btn__button" disabled={loading}>
                                Add {loading ? <Loader small={true} /> : <AddOutlinedIcon className="wrapper__form__container__btn__button__icon" />}
                            </button>
                        </div>
                        <div className="wrapper__form__container__bottom">
                            <p className="wrapper__form__container__bottom__title"><span>View Products</span><Link to="/admin/products" className='wrapper__form__container__bottom__title__link'><ArrowForwardOutlinedIcon className='wrapper__form__container__bottom__title__link__icon'/></Link></p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default NewProduct