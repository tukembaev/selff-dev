import { Dot } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "shared/shadcn/ui/breadcrumb";

const BreadCrumbs = () => {
  return (
    <Breadcrumb className="pb-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/posts">Публикации</BreadcrumbLink>
        </BreadcrumbItem>

        <Dot />

        <BreadcrumbItem>
          <BreadcrumbLink href="/post/1">Пост</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/battle/b2">Battle</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/duel">Дуэль с другом</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
