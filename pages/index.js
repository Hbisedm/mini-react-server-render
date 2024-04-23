import axios from 'axios'
import React from 'react'

export async function getServerSideProps() {
	const res = await axios('https://api.thecatapi.com/v1/images/search')
	const cat = await res.data
	return { props: { cat } }
}

export default function Page({cat}) {
	return (
		<img src={cat[0].url} width="200" />
	)
}