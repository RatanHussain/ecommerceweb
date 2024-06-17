/** @format */

import axios from 'axios';
import './App.css';
import Celegory from './Celegory';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
	let productsApi = 'https://dummyjson.com/products';
	let cetegoryApi = 'https://dummyjson.com/products/categories';
	let quaryApi = 'https://dummyjson.com/products/category/';

	let [allitems, setAllItems] = useState([]);
	let [allCelegory, setAllCelegory] = useState([]);
	let [quaryed, setQuaryed] = useState('');

	let allProducts = () => {
		axios
			.get(productsApi)
			.then((res) => res.data)
			.then((datas) => setAllItems(datas.products));
	};
	let allCetegory = () => {
		axios
			.get(cetegoryApi)
			.then((res) => res.data)
			.then((datas) => setAllCelegory(datas));
	};

	let allProduct = allitems.map((v, i) => {
		return makeitem(v, i);
	});

	useEffect(() => {
		allProducts();
		allCetegory();
	}, []);

	useEffect(() => {
		if (quaryed !== '') {
			doQuary();
		}
	}, [quaryed]);

	function doQuary() {
		axios
			.get(`${quaryApi}${quaryed}`)
			.then((res) => res.data)
			.then((data) => setAllItems(data.products));
	}

	return (
		<div className='App'>
			<div className='container-fluid'>
				<h1 className='fw-bolder text-center my-5'>E-Commerce web Header</h1>
				<hr className='mb-5' />
				<div className='container'>
					<div className='row'>
						<div className='col-3'>
							<h4 className='fw-bold text-center'>Cetegory</h4>
							<Celegory allCelegory={allCelegory} setQuaryed={setQuaryed} />
						</div>
						<div className='col-9'>
							<h4 className='fw-bold text-center d-block'>Products</h4>
							<div className='items d-flex flex-wrap gap-3'>
								{allProduct.length >= 1 ? (
									allProduct
								) : (
									<h2>Product Not Found...!</h2>
								)}
							</div>
						</div>
					</div>
				</div>
				<hr className='my-5' />
				<h1 className='fw-bolder text-center my-5'>E-Commerce web Footer</h1>
			</div>
		</div>
	);
}

export default App;

function makeitem(v, i) {
	return (
		<div key={i} className='card sizeCard col-3 p-2'>
			<img className='size' src={v.thumbnail} alt='' />
			<p className='price'>{v.title}</p>
			<h6 className='text-center fw-bold price'>{v.price} SAR</h6>
			<button className='btn btn-info'>add cart...</button>
		</div>
	);
}
