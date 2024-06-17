/** @format */

import React from 'react';

export default function Celegory({ allCelegory ,setQuaryed }) {
	let items = allCelegory.map((v, i) => {
		return (
			<li onClick={()=> setQuaryed(v.name)} key={i} role='button' className='list-group-item list-group-item-action'>
				{v.name}
			</li>
		);
	});
	return (
		<>
            <ul className='list-group'>{items }</ul>
		</>
	);
}
