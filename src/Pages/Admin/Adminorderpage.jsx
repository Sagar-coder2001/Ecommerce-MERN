import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import {fetchAllOrdersAsync, selectOrders, updateOrderAsync } from '../../Features/Orderslice';
import ProtectedAdmin from './ProtectedAdmin';
import Layout from '../../Components/Client/Layout/Layout';
import Adminsidebar from './Adminsidebar';

function AdminOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
  }, [dispatch]);

  
  const orders = useSelector(selectOrders);
  console.log(orders);

  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = () => {
    console.log('handleShow');
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handleOrderPaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-purple-200 text-purple-600';
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'delivered':
        return 'bg-green-200 text-green-600';
      case 'received':
        return 'bg-green-200 text-green-600';
      case 'cancelled':
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  };




  return (
    <Layout>

    <ProtectedAdmin>
      <Adminsidebar/>
      <div className="overflow-x-auto sm:ml-64 py-6 mt-10 ">
          <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
            <div className="w-full p-4 h-screen mb-10">
              <div className="bg-white shadow-lg rounded-lg my-6 overflow-scroll">
                <table className="w-full table-auto border-collapse rounded-lg overflow-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border-b">
                      <th
                        className="py-3 px-4 text-left cursor-pointer hover:bg-gray-300 rounded-tl-lg"
                        onClick={(e) =>
                          handleSort({
                            sort: 'id',
                            order: sort?._order === 'asc' ? 'desc' : 'asc',
                          })
                        }
                      >
                        Order#{' '}
                        {sort._sort === 'id' &&
                          (sort._order === 'asc' ? (
                            <ArrowUpIcon className="w-4 h-4 inline" />
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 inline" />
                          ))}
                      </th>
                      <th className="py-3 px-4 text-left">Items</th>
                      <th
                        className="py-3 px-4 text-left cursor-pointer hover:bg-gray-300"
                        onClick={(e) =>
                          handleSort({
                            sort: 'totalAmount',
                            order: sort?._order === 'asc' ? 'desc' : 'asc',
                          })
                        }
                      >
                        Total Amount{' '}
                        {sort._sort === 'totalAmount' &&
                          (sort._order === 'asc' ? (
                            <ArrowUpIcon className="w-4 h-4 inline" />
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 inline" />
                          ))}
                      </th>
                      <th className="py-3 px-4 text-center">Shipping Address</th>
                      <th className="py-3 px-4 text-center">Order Status</th>
                      <th className="py-3 px-4 text-center">Payment Method</th>
                      <th className="py-3 px-4 text-center">Payment Status</th>
                      <th
                        className="py-3 px-4 text-left cursor-pointer hover:bg-gray-300"
                        onClick={(e) =>
                          handleSort({
                            sort: 'createdAt',
                            order: sort?._order === 'asc' ? 'desc' : 'asc',
                          })
                        }
                      >
                        Order Time{' '}
                        {sort._sort === 'createdAt' &&
                          (sort._order === 'asc' ? (
                            <ArrowUpIcon className="w-4 h-4 inline" />
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 inline" />
                          ))}
                      </th>
                      <th
                        className="py-3 px-4 text-left cursor-pointer hover:bg-gray-300"
                        onClick={(e) =>
                          handleSort({
                            sort: 'updatedAt',
                            order: sort?._order === 'asc' ? 'desc' : 'asc',
                          })
                        }
                      >
                        Last Updated{' '}
                        {sort._sort === 'updatedAt' &&
                          (sort._order === 'asc' ? (
                            <ArrowUpIcon className="w-4 h-4 inline" />
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 inline" />
                          ))}
                      </th>
                      <th className="py-3 px-4 text-center rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-200 hover:bg-gray-100 transition duration-300"
                      >
                        <td className="py-3 px-4 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-left">
                          {order.products.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item.product.images[0]}
                                  alt={item.product.title}
                                />
                              </div>
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-4 text-center">${order.totalAmount}</td>
                        <td className="py-3 px-4 text-center">
                          <div>
                            <strong>{order.selectaddress.name}</strong>,<br />
                            {order.selectaddress.street_address},<br />
                            {order.selectaddress.city}, {order.selectaddress.region},<br />
                            {order.selectaddress.postal_code}, {order.selectaddress.country}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {order.id === editableOrderId ? (
                            <select onChange={(e) => handleOrderStatus(e, order)} className="p-2 rounded-md bg-gray-50">
                              <option value="pending">Pending</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span
                              className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}
                            >
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">{order.selectpaymentmode}</td>
                        <td className="py-3 px-4 text-center">
                          {order.id === editableOrderId ? (
                            <select onChange={(e) => handleOrderPaymentStatus(e, order)} className="p-2 rounded-md bg-gray-50">
                              <option value="pending">Pending</option>
                              <option value="received">Received</option>
                            </select>
                          ) : (
                            <span
                              className={`${chooseColor(order.paymentStatus)} py-1 px-3 rounded-full text-xs`}
                            >
                              {order.paymentStatus}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {order.createdAt ? new Date(order.createdAt).toLocaleString() : null}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : null}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-4">
                            <div className="transform hover:text-purple-500 hover:scale-125">
                              <EyeIcon className="w-6 h-6" onClick={(e) => handleShow(order)} />
                            </div>
                            <div className="transform hover:text-purple-500 hover:scale-125">
                              <PencilIcon className="w-6 h-6" onClick={(e) => handleEdit(order)} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

    </ProtectedAdmin>
    </Layout>

  );
}

export default AdminOrders;