import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../../Context';
import { BookOpen, FileText, Award, Loader, Eye } from 'lucide-react';

const Dashboard = () => {
    const context = useContext(Context.Context);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [courses, papers, patents] = await Promise.all([
            context.data.getCourses(),
            context.data.getPapers(),
            context.data.getPatents()
          ]);
          const combinedItems = [
            ...courses.map(course => ({ ...course, type: 'Course' })),
            ...papers.map(paper => ({ ...paper, type: 'Paper' })),
            ...patents.map(patent => ({ ...patent, type: 'Patent' }))
          ];
          setItems(combinedItems);
        } catch (error) {
          console.error('Error fetching data', error);
          navigate('/error');
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, [context.data, navigate]);
  
    const getIcon = (type) => {
      switch (type) {
        case 'Course':
          return <BookOpen className="w-6 h-6 text-blue-800" />;
        case 'Paper':
          return <FileText className="w-6 h-6 text-green-800" />;
        case 'Patent':
          return <Award className="w-6 h-6 text-yellow-800" />;
        default:
          return null;
      }
    };
  
    const getBgColor = (type) => {
      switch (type) {
        case 'Course':
          return 'bg-blue-100 border-blue-300';
        case 'Paper':
          return 'bg-green-100 border-green-300';
        case 'Patent':
          return 'bg-yellow-100 border-yellow-300';
        default:
          return 'bg-gray-100 border-gray-300';
      }
    };
  
    if (isLoading) return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-purple-200">
        <Loader className="w-16 h-16 animate-spin text-indigo-600" />
      </div>
    );
  
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
            Courses, Papers, and Patents
          </h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-200 border-b border-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-400">Type</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-400">Title</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-400">Publisher</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {items.map((item) => (
                    <tr key={`${item.type}-${item.id}`} className={`${getBgColor(item.type)} hover:bg-opacity-80 transition-colors duration-300`}>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center border-b border-gray-400 border-r">
                        {getIcon(item.type)}
                        <span className="ml-3 text-sm font-medium text-gray-800">{item.type}</span>
                      </td>
                      <td className="px-6 py-4 border-b border-gray-400 border-r">
                        <div className="text-sm font-medium text-gray-800">{item.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-400 border-r">
                        <div className="text-sm text-gray-600">{item.User ? `${item.User.firstName} ${item.User.lastName}` : 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-b border-gray-400">
                        <Link to={`/${item.type.toLowerCase()}s/${item.id}`} className="text-indigo-700 hover:text-indigo-900 flex items-center">
                          <Eye className="w-5 h-5 mr-2" />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {context.authenticatedUser && (
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Link to='/courses/create' className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
                <BookOpen className="w-6 h-6 mr-2" />
                New Course
              </Link>
              <Link to='/papers/create' className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300">
                <FileText className="w-6 h-6 mr-2" />
                New Paper
              </Link>
              <Link to='/patents/create' className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-300">
                <Award className="w-6 h-6 mr-2" />
                New Patent
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Dashboard;