import { FaUtensils } from "react-icons/fa";

const AddProducts = () => {
  return (
    <div className="mx-8">
      <div className="w-48 mx-auto">
        <h2 className="font-extrabold text-2xl text-center mx-auto my-4 border-b-4 border-b-green-400 ">
          Add Products
        </h2>
      </div>
      <form>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Recipe Name*</span>
          </label>
          <input
            type="text"
            placeholder="Recipe Name"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex gap-6">
          {/* category */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Category*</span>
            </label>
            <select
              defaultValue="default"
              className="select select-bordered w-full"
            >
              <option disabled value="default">
                Select a category
              </option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          {/* price */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Price*</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* recipe details */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipe Details</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
          ></textarea>
        </div>

        <div className="form-control w-full my-6">
          <input type="file" className="file-input w-full max-w-xs" />
        </div>

        <button className="btn">
          Add Item <FaUtensils className="ml-4"></FaUtensils>
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
