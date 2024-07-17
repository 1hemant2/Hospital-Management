import React from 'react';
import Card5 from '../../component/Card5';
import Card6 from '../../component/Card6';
import Footer from '../../component/Footer';

const Home: React.FC = () => {
    return (
        <div>
            <div className=" border-t border-gray-300 shadow-md p-2">
                <div className="flex m-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className='h-10 w-10'
                    >
                        <path d="M18 1C18 1.71561 17.9359 2.37948 17.8155 3H8.23193C8.41382 3.72694 8.69997 4.38283 9.08066 5H17.1807C16.132 7.31672 14.1871 8.99371 12 10.7267C8.72906 8.13494 6 5.66845 6 1H4C4 6.46624 7.21013 9.46355 10.3863 12C7.21013 14.5365 4 17.5338 4 23H6C6 18.0404 9.08011 15.566 12.6178 12.7863L12.7096 12.7142C16.149 10.0123 20 6.98705 20 1H18ZM17.8155 21.0002H8.23193C8.41382 20.2733 8.69997 19.6174 9.08066 19.0002H17.1807C16.3939 17.262 15.1026 15.8839 13.583 14.5721C14.1162 14.1516 14.6526 13.7351 15.1811 13.3086C17.7659 15.5981 20 18.44 20 23.0002H18C18 22.2846 17.9359 21.6207 17.8155 21.0002Z" ></path>
                    </svg>
                    <p className='text-3xl font-semibold ml-2'>Welcome, Patient</p>
                </div>
            </div>
            <div className='grid grid-cols-2 mt-10 gap-y-8 gap-x-5 p-6'>
                <Card5 icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>' name='dr.joe' email='joe@gmail.com'></Card5>
                <Card6 icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.97308 18H14.0269C14.1589 16.7984 14.7721 15.8065 15.7676 14.7226C15.8797 14.6006 16.5988 13.8564 16.6841 13.7501C17.5318 12.6931 18 11.385 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 11.3843 6.46774 12.6917 7.31462 13.7484C7.40004 13.855 8.12081 14.6012 8.23154 14.7218C9.22766 15.8064 9.84103 16.7984 9.97308 18ZM14 20H10V21H14V20ZM5.75395 14.9992C4.65645 13.6297 4 11.8915 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 11.8925 19.3428 13.6315 18.2443 15.0014C17.624 15.7748 16 17 16 18.5V21C16 22.1046 15.1046 23 14 23H10C8.89543 23 8 22.1046 8 21V18.5C8 17 6.37458 15.7736 5.75395 14.9992ZM13 10.0048H15.5L11 16.0048V12.0048H8.5L13 6V10.0048Z"></path></svg>' heading='Stay Positive'
                    quote={`"Believe you can and you're halfway there." - Theodore Roosevelt`} >
                </Card6>
                <Card6 icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C10.0226 20.3135 4.91699 17.563 2.86894 13.001L1 13V11L2.21045 11.0009C2.07425 10.3633 2 9.69651 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 9.68542 4.09035 10.3516 4.26658 11.0004L6.43381 11L8.5 7.55635L11.5 12.5563L12.4338 11H17V13H13.5662L11.5 16.4437L8.5 11.4437L7.56619 13L5.10789 13.0006C5.89727 14.3737 7.09304 15.6681 8.64514 16.9029C9.39001 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5Z"></path></svg>' heading='Take Care of Yourself'
                    quote={`"Your health is your wealth. Prioritize self-care for a happier life."`} >
                </Card6>
                <Card6 icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 2V22H19V14H16V7C16 4.23858 18.2386 2 21 2ZM9 13.9V22H7V13.9C4.71776 13.4367 3 11.419 3 9V3H5V10H7V3H9V10H11V3H13V9C13 11.419 11.2822 13.4367 9 13.9Z"></path></svg>'
                    heading='Eat Healthy'
                    quote={`A healthy diet is the foundation for a healthy life. Nourish your body with wholesome foods."`} >
                </Card6>
            </div>
            <div className="mt-24"></div>
            <Footer></Footer>
        </div>

    );
};

export default Home;