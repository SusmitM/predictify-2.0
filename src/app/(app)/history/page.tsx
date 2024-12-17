'use client'
import { useQuery } from "@apollo/client";
import { GET_EXTRACTED_DATA } from "graphql/queries";
import client from "lib/apollo-client";


const Page = () => {
  const { data, loading, error } = useQuery(GET_EXTRACTED_DATA,{
    client
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.getExtractedData.extractedData.length === 0 ? (
        <p>No extracted data found.</p>
      ) : (
        <ul>
          {data.getExtractedData.extractedData.map((item: any) => (
            <li className="text-white border-2 border-red-500" key={item._id}>
              <strong>{item.filename}</strong> - {item.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;