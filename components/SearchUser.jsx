import { useState, useCallback, useRef } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";

import api from "../lib/api";

const Option = Select.Option;

function SearchUser({ onChange, value }) {
  const lastFetchIdRef = useRef(0);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const fetchUser = useCallback(
    debounce((value) => {
      //   console.log("fetching user", value);

      lastFetchIdRef.current += 1;
      const fetchId = lastFetchIdRef.current;
      setFetching(true);
      setOptions([]);

      api
        .request({
          url: `/search/users?q=${value}`,
        })
        .then((resp) => {
          //   console.log("user: ", resp);
          if (fetchId !== lastFetchIdRef.current) return;

          const data = resp.data.items.map((user) => ({
            text: user.login,
            value: user.login,
          }));

          setFetching(false);
          setOptions(data);
        })
        .catch((err) => {
          setFetching(false);
          setOptions([]);
        });
    }, 500),
    []
  );

  const handleChange = (value) => {
    setFetching(false);
    setOptions([]);
    onChange(value);
  };

  return (
    <Select
      placeholder="Creator..."
      showSearch={true}
      notFoundContent={fetching ? <Spin size="small" /> : <span>...</span>}
      filterOption={false}
      value={value}
      onSearch={fetchUser}
      onChange={handleChange}
      allowClear={true}
      style={{ width: 200 }}
    >
      {options.map((option) => (
        <Option value={option.value} key={option.value}>
          {option.text}
        </Option>
      ))}
    </Select>
  );
}

export default SearchUser;
