# Resume Schema

This schema is an attempt to afford a resume the ability to describe the variety of information provided and required to communicate the breadth and depth of experience found in a software career.

```json
{
    "version": string, // Date of last update
    "current": Workplace,
    "past": Workplace[],
    "skills": SkillAspect[],
    "community": CommunityAspect[]
}
```

## Workplaces

Workplaces are groupings by employer, or as self-employed, that detail a particular span of time.

```json
{
    "workplace": string, // Employer or Organization
    "workplaceUrl": string | undefined, // URL of employer or organization
    "start": Date, // String representation of this workplace's start date
    "end": Date | undefined, // String representation of this workplace's end date
    "description": string | undefined, // Multiline string describing this workplace in detail
    "roles": Role[]
}
```

## Roles

Roles detail defined spans of time (may be ongoing) to convey experience and responsibilities in both a narrative description and set of skills utilized. Multiple roles may be found within a single workplace.

```json
{
    "title": string, // Job title or role
    "start": Date | undefined, // String representation of this position's start date
    "end": Date | undefined, // String representation of this position's end date
    "description": string, // Multiline string describing this role in detail
    "skills": SkillAspect[]
}
```

## Aspects

Aspects are varying pieces of information that may be relevant to inform specific details not covered in Roles.

### CommunityAspect

Details of a community-related activity, nominally a service position or specific outstanding experience.

```json
{
    "title": string, // Aspect title, short name or description
    "date": string, // Date (range)
    "description": string, // Multiline string describing this experience in detail
    "location": string | undefined,// Location
    "video": string | undefined, // URL of video
    "slides": string | undefined // URL of slide deck
}
```

### SkillAspect

Details of skills, may be nested, to provide context related to other parts of the resume.

```json
{
    "skill": string, // Short description of a skill
    "skills": SkillAspect[] | undefined
}
```