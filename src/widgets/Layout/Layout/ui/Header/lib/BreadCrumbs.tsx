import { Dot } from "lucide-react";
import { ModeToggle } from "shared/components/ModeToggle";
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
          <BreadcrumbLink href="/duel/b2">Дуэль с другом</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
                    <ModeToggle />
      
    </Breadcrumb>
  );
};

export default BreadCrumbs;
