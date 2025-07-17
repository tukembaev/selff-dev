import React, { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ExampleData, FactsData, NoteData, Post } from "entities/Post";
import { Example } from "./SectionVariants/Example";
import { FactsList } from "./SectionVariants/FactsList";
import { Note } from "./SectionVariants/Note";
import { cn } from "shared/lib/utils";
import { LuGripVertical } from "react-icons/lu";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem = ({ id, children }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "flex items-center p-2 rounded-md transition-shadow",
        isDragging ? "shadow-md bg-muted" : "bg-transparent"
      )}
    >
      <div
        {...listeners}
        className="cursor-grab mr-3 select-none text-gray-500 hover:text-gray-700"
        aria-label="Drag handle"
      >
        <LuGripVertical size={20} />
      </div>
      <div>{children}</div>
    </div>
  );
};

interface RenderAdditionalSectionProps {
  content: Post["content"];
  postId: string;
}

export const RenderAdditionalSection = ({
  content,
  postId,
}: RenderAdditionalSectionProps) => {
  const [sections, setSections] = useState(content.structuredContent);
  if (!sections.length) return null;
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((item) => item.id === active.id);
    const newIndex = sections.findIndex((item) => item.id === over.id);

    const reorderedSections = [...sections];
    const [movedSection] = reorderedSections.splice(oldIndex, 1);
    reorderedSections.splice(newIndex, 0, movedSection);

    setSections(reorderedSections);

    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: {
            definition: content.definition,
            source: content.source,
            structuredContent: reorderedSections,
          },
        }),
      });
    } catch (error) {
      console.error("Failed to update section order:", error);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={sections.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {sections.map((content) => (
            <SortableItem key={content.id} id={content.id}>
              {content.type === "Facts" && (
                <FactsList data={content.data as FactsData} />
              )}
              {content.type === "Note" && (
                <Note data={content.data as NoteData} />
              )}
              {content.type === "Example" && (
                <Example data={content.data as ExampleData} />
              )}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
