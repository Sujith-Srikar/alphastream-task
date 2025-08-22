import {type FilterValue} from "../types/types"

export default function applyEntitlementFilters(
  data: any[],
  filters: Record<string, FilterValue>
) {
  return data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      const fieldValue = item[key];

      if (Array.isArray(value)) {
        return value.includes(fieldValue);
      }

      if (typeof value === "object" && value !== null && "From" in value && "To" in value) {
        return fieldValue >= value.From && fieldValue <= value.To;
      }

      return fieldValue === value;
    });
  });
}