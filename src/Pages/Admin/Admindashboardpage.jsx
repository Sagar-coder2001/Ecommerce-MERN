import React, { useEffect } from 'react'
import Layout from '../../Components/Client/Layout/Layout'
import Adminsidebar from './Adminsidebar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrdersAsync, selectOrders } from '../../Features/Orderslice'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

const Admindashboardpage = () => {
    const orders = useSelector(selectOrders)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllOrdersAsync());
    }, [dispatch]);

    console.log(orders)
    return (
        <div>
            <Layout>
                <Adminsidebar />
                <div className="ml-64 mt-20">
                    <div className="mt-4">
                        <div className="grid">
                            <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2">
                                <div className="bg-amber-200 p-2 text-white text-2xl text-bold text-center p-5 rounded-2xl">
                                    <p>Orders</p>
                                    <p>{orders.length}</p>
                                </div>
                                <div className="bg-blue-200 p-2 text-white text-2xl text-bold text-center p-5 rounded-2xl">
                                    <p>Products</p>
                                    <p>0</p>
                                </div>
                                <div className="bg-cyan-200 p-2 text-white text-2xl text-bold text-center p-5 rounded-2xl">
                                    <p>Users</p>
                                    <p>0</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 h-screen">
                           
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Admindashboardpage
