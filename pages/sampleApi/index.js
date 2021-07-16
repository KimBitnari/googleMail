import Head from 'next/head'
import fetch from 'node-fetch';
import 'tailwindcss/tailwind.css'

export default function Home({ data }) {
    return (
    <div className="mx-10 mt-2">
        <Head>
            <title>Books</title>
        </Head>
        <section>
            <h2 className="mb-2 font-bold">Categories</h2>
            {data.landing_course_categories.map((category) => (
                <div className="float-left w-1/5 border-yellow-500 bg-yellow-500 text-center rounded-md mx-2" key={category.id}>
                    {category.title}
                </div>
            ))}
        </section>
        <br /> <br />
        <hr />
        <br />
        <section>
            <h2 className="mb-2 font-bold">Books</h2>
            <table className="border-collapse">
                <tr>
                    <th className="text-center bg-yellow-500 bg-opacity-25 p-4">category</th>
                    <th className="text-center bg-yellow-500 bg-opacity-25 p-4">image</th>
                    <th className="text-center bg-yellow-500 bg-opacity-25 p-4">title</th>
                    <th className="text-center bg-yellow-500 bg-opacity-25 p-4">sub-title</th>
                    <th className="text-center bg-yellow-500 bg-opacity-25 p-4">date</th>
                </tr>
                {data.landing_courses.map((landCoures) => (
                    landCoures.courses.map((course) => (
                        <tr key={course.id} class="divide-y">
                            <td className="p-4 text-xs">{course.category}</td>
                            <td className="p-4"><img src={course.image_url} alt={course.title} style={{ width:"50px" }} /></td>
                            <td className="p-4">{course.title}</td>
                            <td className="p-4 text-xs">{course.subtitle}</td>
                            <td className="p-4 text-xs">{course.created_at}</td>
                        </tr>
                    ))
                ))}
            </table>
        </section>
    </div>
    );
}

export async function getServerSideProps(context) {
    const res = await fetch(
        'https://api.ringleplus.com/api/v4/student/landing/course?locale=ko'
    );
    const data = await res.json();
    return {
        props: { 
            data: data 
        }
    };
  };