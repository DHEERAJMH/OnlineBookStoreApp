import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems
        .reduce((acc, item) => acc + (parseFloat(item.newPrice) || 0), 0)
        .toFixed(2);

    const { currentUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate();

    const [isChecked, setisChecked] = useState(false);

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productids: cartItems.map(item => item?._id),
            totalPrice: totalPrice
        };

        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Order Confirmed",
                text: "Your order has been placed successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
            navigate("/orders");
        } catch (error) {
            console.error("Error placing order", error);
            Swal.fire({
                title: "Error",
                text: "Failed to place the order. Please try again.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK"
            });
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <section>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
                            <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
                            <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>
                        </div>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Personal Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="name">Full Name</label>
                                            <input
                                                {...register("name", { required: true })}
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.name && <span className="text-red-500">Name is required</span>}
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                disabled
                                                defaultValue={currentUser?.email}
                                            />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input
                                                {...register("phone", { required: true })}
                                                type="number"
                                                name="phone"
                                                id="phone"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="+123 456 7890"
                                            />
                                            {errors.phone && <span className="text-red-500">Phone is required</span>}
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="address">Address / Street</label>
                                            <input
                                                {...register("address", { required: true })}
                                                type="text"
                                                name="address"
                                                id="address"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.address && <span className="text-red-500">Address is required</span>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="city">City</label>
                                            <input
                                                {...register("city", { required: true })}
                                                type="text"
                                                name="city"
                                                id="city"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.city && <span className="text-red-500">City is required</span>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="country">Country / Region</label>
                                            <input
                                                {...register("country", { required: true })}
                                                name="country"
                                                id="country"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.country && <span className="text-red-500">Country is required</span>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="state">State / Province</label>
                                            <input
                                                {...register("state", { required: true })}
                                                name="state"
                                                id="state"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.state && <span className="text-red-500">State is required</span>}
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="zipcode">Zipcode</label>
                                            <input
                                                {...register("zipcode", { required: true })}
                                                type="text"
                                                name="zipcode"
                                                id="zipcode"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.zipcode && <span className="text-red-500">Zipcode is required</span>}
                                        </div>

                                        <div className="md:col-span-5 mt-3">
                                            <div className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="billing_same"
                                                    id="billing_same"
                                                    className="form-checkbox"
                                                    onChange={(e) => setisChecked(e.target.checked)}
                                                />
                                                <label htmlFor="billing_same" className="ml-2">
                                                    I agree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shopping Policy</Link>.
                                                </label>
                                            </div>
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    disabled={!isChecked}
                                                    type="submit"
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Place an Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
