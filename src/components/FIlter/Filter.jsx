import PropTypes from 'prop-types';
import { FilterLabel, FilterInput } from './Filter.styled';

export default function Filter({ onChange, title, value }) {
  return (
    <FilterLabel htmlFor="filter">
      {title}
      <FilterInput
        name="filter"
        type="text"
        value={value}
        onChange={onChange}
        required
      />
    </FilterLabel>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
